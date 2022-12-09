import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { NotificacionesCorreoInput, NotificacionesSmsInput } from './dto/notificaciones.dto';
const SibApiV3Sdk = require('sib-api-v3-typescript');


@Injectable()
export class NotificacionesService {
    constructor(
        private prismaService: PrismaService,
    ) { }

    async sendNotificacionCorreo(data: NotificacionesCorreoInput) {

        if (data.correo == undefined || data.nombre_usuario == undefined || data.params === undefined) {
            return { error: "Debe suministrar los datos completos", error_code: "017" };
        }

        let info = await this.sendMail(data, data.params, 1, data.nombre_plantilla)
        if (info.correo_enviado_id !== undefined) {
            return { notificacion: "Enviado correctamente", statusCode: 200 };
        }
        else {
            return { error: "No se pudo enviar el mensaje", error_code: "018" };
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

    async buildApiKey(proveedor_mensajeria_id: number, apiInstance: any) {

        let apiKey = apiInstance.authentications['apiKey'];

        let parametroLlave = await this.prismaService.proveedoresMensajeriaParametrosValores.findFirst({
            where: {
                ProveedoresMensajeria: {
                    proveedor_mensajeria_id: proveedor_mensajeria_id
                }, ProveedoresMensajeriaParametros: { nombre: "llave" }
            },
            select: { valor: true }
        });

        apiKey.apiKey = parametroLlave.valor;

        // await this.updateWebHook(parametroLlave.valor);
        await this.getAllWebhooks(parametroLlave.valor);

        return apiKey;
    }

    async sendMail(data: any, params: any, proveedor_mensajeria_id: number, nombre_plantilla: string) {

        let templateInfo = [];
        let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        await this.buildApiKey(proveedor_mensajeria_id, apiInstance);

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
        await this.buildApiKey(proveedor_mensajeria_id, apiInstance);

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

        if (sendinBlue_Mail.response.statusCode == 400) {
            sendinBlue_Mail.body.messageId = null;
        }

        return this.prismaService.correosEnviados.create({
            data: {
                empresa_id: 1,
                fecha_envio: new Date(JSON.stringify(sendinBlue_Mail.response.headers.date)),
                correo_destino: data.correo,
                indicador_entregado: true,
                mensaje_id: JSON.stringify(sendinBlue_Mail.body.messageId),
                origen_peticion: "admin",
                fecha_recibido: new Date(),
                respuesta: JSON.stringify(sendinBlue_Mail.response),
                peticion: JSON.stringify(sendSmtpEmail),
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
