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

        if (data.usuario == undefined) {
            return { error: "No se encontraron datos del usuario", error_code: "017" };
        }
        let usuarios = JSON.parse(data.usuario);
        let params: any;

        if (data.params !== undefined) {
            params = JSON.parse(data.params);
        }

        let info = await this.sendMail(usuarios, params, 1, data.nombre_plantilla)
        if (info.correo_enviado_id !== undefined) {
            return { notificacion: "Enviado correctamente" };
        }
        else {
            return { error: "No se pudo enviar el mensaje", error_code: "018" };
        }
    }

    async sendNotificacionSms(data: NotificacionesSmsInput) {

        if (data.usuario == undefined) {
            return { error: "No se encontraron datos del usuario", error_code: "017" };
        }
        let usuarios = JSON.parse(data.usuario);

        let sms = await this.sendSMS(usuarios, 2);
        if (sms !== undefined) {
            return { notificacion: "Enviado correctamente" };
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

        return apiKey;
    }

    async sendMail(usuarios: any, params: any, proveedor_mensajeria_id: number, nombre: string) {

        if (nombre == undefined || usuarios == undefined || proveedor_mensajeria_id == undefined) {
            return { error: "Debe suministrar los datos completos", error_code: "019" };
        }

        let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        await this.buildApiKey(proveedor_mensajeria_id, apiInstance);

        let limit = 50;
        let offset = 0;

        let sendinblue = await apiInstance.getSmtpTemplates(true, limit, offset);
        const templateInfo = sendinblue.response.body.templates.filter(data => data.name === nombre);

        let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

        sendSmtpEmail.templateId = templateInfo[0].id;
        sendSmtpEmail.sender = { email: templateInfo[0].sender.email, name: templateInfo[0].sender.name };
        sendSmtpEmail.to = [{ email: usuarios.correo, name: usuarios.nombre_usuario }];
        sendSmtpEmail.params = params;

        try {
            let sendinBlue_Mail = await apiInstance.sendTransacEmail(sendSmtpEmail);
            return this.saveCorreosEnviados(usuarios, sendinBlue_Mail, sendSmtpEmail);

        } catch (error) {
            console.log(JSON.stringify(error))
            this.saveCorreosEnviados(usuarios, error, sendSmtpEmail);
            return error;
        }
    }

    async sendSMS(usuario: any, proveedor_mensajeria_id: number) {

        let apiInstance = new SibApiV3Sdk.TransactionalSMSApi();
        await this.buildApiKey(proveedor_mensajeria_id, apiInstance);

        let sendTransacSms = new SibApiV3Sdk.SendTransacSms();

        sendTransacSms = {
            "sender": "Tiresia",
            "recipient": usuario.celular,
            "content": "Enter this code:CCJJG8 to validate your account",
        };

        try {
            let sendinBlue_SMS = await apiInstance.sendTransacSms(sendTransacSms);
            console.log(sendinBlue_SMS)

        } catch (error) {
            console.log(JSON.stringify(error))
        }
    }

    async saveCorreosEnviados(usuarios: any, sendinBlue_Mail: any, sendSmtpEmail: any) {

        if (sendinBlue_Mail.response.statusCode == 400) {
            sendinBlue_Mail.body.messageId = null;
        }

        return this.prismaService.correosEnviados.create({
            data: {
                empresa_id: 1,
                fecha_envio: new Date(JSON.stringify(sendinBlue_Mail.response.headers.date)),
                correo_destino: usuarios.correo,
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
}
