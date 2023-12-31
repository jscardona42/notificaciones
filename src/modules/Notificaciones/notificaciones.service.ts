import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { NotificacionesCorreoInput, NotificacionesSmsInput, NotificacionesWhatsappInput } from './dto/notificaciones.dto';
const SibApiV3Sdk = require('sib-api-v3-typescript');
import axios from 'axios';


@Injectable()
export class NotificacionesService {
    constructor(
        private prismaService: PrismaService
    ) { }

    async sendNotificacionCorreo(data: NotificacionesCorreoInput) {

        if (data.correo == undefined || data.nombre_usuario == undefined || data.params === undefined) {
            throw new UnauthorizedException({ error: "Debe suministrar los datos completos", error_code: "017" });
        }

        let info = await this.sendMail(data, data.params, data.proveedor_mensajeria_id, data.nombre_plantilla)
        if (info.correo_enviado_id !== undefined) {
            return { notificacion: "Enviado correctamente", statusCode: 200 };
        }
        else {
            throw new UnauthorizedException(info);
        }
    }

    async sendNotificacionSms(data: NotificacionesSmsInput) {

        if (data.telefono == undefined) {
            return { error: "Debe suministrar los datos completos", error_code: "017" };
        }

        let sms = await this.sendSMS(data, 2);
        if (sms !== undefined) {
            return { notificacion: "Enviado correctamente", statusCode: 200 };
        }
        else {
            return { error: "No se pudo enviar el mensaje", error_code: "018" };
        }
    }

    async sendNotificacionWhatsapp(data: NotificacionesWhatsappInput) {
        let parametroLlave = await this.getParamatroByproveedorIdAndNombre(3, "llave");
        let parametroCuenta = await this.getParamatroByproveedorIdAndNombre(3, "cuenta");
        let parametroUrlApi = await this.getParamatroByproveedorIdAndNombre(3, "url_api");

        if (parametroLlave.valor == undefined || parametroCuenta.valor == undefined || parametroUrlApi.valor == undefined) {
            return { error: "No se encontraron los parámetros necesarios para enviar el mensaje por Whatsapp", error_code: "020" };
        }

        let url_api = parametroUrlApi.valor.replace("VERSION", process.env.VERSION_WHATSAPP).replace("CUENTA", parametroCuenta.valor);

        let message = await this.buildDataWhatsapp(data);

        if (message["error"] !== undefined) {
            throw new UnauthorizedException(message);
        }

        let res = await axios.post(url_api, message,
            { headers: { Authorization: `Bearer ${parametroLlave.valor}` } })
            .then((res) => { return res.data })
            .catch(err => { return err.response.data });

        await this.saveMensajesEnviados(data, res, message);

        if (res.error !== undefined) {
            throw new UnauthorizedException({ error: "El nombre de la plantilla o los parámetros no son correctos", error_code: "021", error_original: res.error });
        }
        return res;
    }

    async getParamatroByproveedorIdAndNombre(proveedor_mensajeria_id: number, nombre: string) {

        return this.prismaService.proveedoresMensajeriaParametrosValores.findFirst({
            where: {
                ProveedoresMensajeria: {
                    proveedor_mensajeria_id: proveedor_mensajeria_id
                }, ProveedoresMensajeriaParametros: { nombre: nombre }
            },
            select: { valor: true }
        });
    }

    async buildDataWhatsapp(data: NotificacionesWhatsappInput) {
        let telefono: any;
        let componentes: any;
        let body: any;

        if (data.telefono.length == 1) {
            telefono = data.telefono[0];
        } else {
            telefono = data.telefono;
        }

        let message = {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: telefono,
            type: "template"
        }

        if (data.nombre_plantilla !== undefined) {
            let parametros = [];

            if (data.parametros !== undefined) {

                data.parametros.forEach(parametro => {
                    parametros.push({
                        type: "text",
                        text: parametro
                    });
                });

                componentes = [
                    {
                        type: "body",
                        parameters: parametros
                    }
                ]
            }

            body = {
                name: data.nombre_plantilla, language: { code: "es" }, components: componentes
            }
        }
        Object.assign(message, { template: body });
        return message;
    }

    async buildApiKeySendinblue(proveedor_mensajeria_id: number, apiInstance: any) {

        let apiKey = apiInstance.authentications['apiKey'];
        let parametroLlave = await this.getParamatroByproveedorIdAndNombre(proveedor_mensajeria_id, "llave");

        apiKey.apiKey = parametroLlave.valor;
        return apiKey;
    }

    async sendMail(data: any, params: any, proveedor_mensajeria_id: number, nombre_plantilla: string) {

        let templateInfo = [];
        let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        await this.buildApiKeySendinblue(proveedor_mensajeria_id, apiInstance);

        let limit = 50;
        let offset = 0;

        let sendinblue = await apiInstance.getSmtpTemplates(true, limit, offset);
        templateInfo = sendinblue.response.body.templates.filter(data => data.name === nombre_plantilla);

        let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

        if (templateInfo.length === 0) {
            return { error: "El nombre de la plantilla no existe", error_code: "019" };
        }

        sendSmtpEmail.templateId = templateInfo[0].id;
        sendSmtpEmail.sender = { email: templateInfo[0].sender.email, name: templateInfo[0].sender.name };
        sendSmtpEmail.to = [{ email: data.correo, name: data.nombre_usuario }];
        sendSmtpEmail.params = params;

        try {
            let sendinBlue_Mail = await apiInstance.sendTransacEmail(sendSmtpEmail);
            return this.saveCorreosEnviados(data, sendinBlue_Mail, sendSmtpEmail);

        } catch (error) {
            console.log(JSON.stringify(error))
            this.saveCorreosEnviados(data, error, sendSmtpEmail);
            return error;
        }
    }

    async sendSMS(data: any, proveedor_mensajeria_id: number) {

        let apiInstance = new SibApiV3Sdk.TransactionalSMSApi();
        await this.buildApiKeySendinblue(proveedor_mensajeria_id, apiInstance);

        let sendTransacSms = new SibApiV3Sdk.SendTransacSms();

        sendTransacSms = {
            "sender": "Tiresia",
            "recipient": data.telefono,
            "content": "Enter this code:CCJJG8 to validate your account",
        };

        try {
            let sendinBlue_SMS = await apiInstance.sendTransacSms(sendTransacSms);
            console.log(sendinBlue_SMS)

        } catch (error) {
            console.log(JSON.stringify(error))
        }
    }

    async saveCorreosEnviados(data: any, sendinBlue_Mail: any, sendSmtpEmail: any) {
        let entregado: boolean = true;

        if (sendinBlue_Mail.response.statusCode == 400) {
            sendinBlue_Mail.body.messageId = null;
            entregado = false;
        }

        return this.prismaService.correosEnviados.create({
            data: {
                empresa_id: 1,
                fecha_envio: new Date(JSON.stringify(sendinBlue_Mail.response.headers.date)),
                correo_destino: data.correo,
                indicador_entregado: entregado,
                mensaje_id: JSON.stringify(sendinBlue_Mail.body.messageId),
                origen_peticion: "admin",
                fecha_recibido: new Date(),
                respuesta: JSON.stringify(sendinBlue_Mail.response),
                peticion: JSON.stringify(sendSmtpEmail),
            }
        })
    }

    async saveMensajesEnviados(data: any, res: any, message: any) {
        let entregado: boolean = true;
        if (res.error !== undefined) {
            entregado = false;
        }

        return this.prismaService.mensajesEnviados.create({
            data: {
                empresa_id: 1,
                fecha_envio: new Date(),
                numero_destino: message.to,
                indicador_entregado: entregado,
                origen_peticion: "origen",
                respuesta: JSON.stringify(res),
                peticion: JSON.stringify(message),
            }
        })
    }

    async saveEventos(data: any) {

        await this.prismaService.correosEnviadosTrazabilidad.create({
            data: {
                evento: data.event,
                mensaje_id: JSON.stringify(data["message-id"]),
                fecha_estado: new Date(data.date),
                respuesta: JSON.stringify(data)
            }
        })
    }

    async getAllWebhooks(api) {

        let apiInstance = new SibApiV3Sdk.WebhooksApi()

        let apiKey = apiInstance.authentications['apiKey'];
        apiKey.apiKey = api;

        let type = 'transactional';

        apiInstance.getWebhooks(type).then(function (data) {
            console.log('API called successfully. Returned data: ' + JSON.stringify(data));
        }, function (error) {
            console.error(error);
        });
    }

    async updateWebHook(api) {
        let apiInstance = new SibApiV3Sdk.WebhooksApi()

        let apiKey = apiInstance.authentications['apiKey'];
        apiKey.apiKey = api;

        let webhookId = 683731;

        let updateWebhook = new SibApiV3Sdk.UpdateWebhook();

        updateWebhook.description = 'webhook sendinblue';
        updateWebhook.url = 'https://preprodclouderp.tiresia.com.co/notificaciones';
        updateWebhook.events = ['request', 'delivered', 'hardBounce', 'softBounce', 'blocked', 'spam', 'invalid', 'opened'];
        updateWebhook.type = 'transactional';

        apiInstance.updateWebhook(webhookId, updateWebhook).then(function (data) {
            console.log('API called successfully. Returned data: ' + JSON.stringify(data));
        }, function (error) {
            console.error(error);
        });
    }

}
