import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { PrismaService } from '../../prisma.service';
import { CreateProveedoresMensajeriaInput, UpdateProveedorMensajeriaInput } from './dto/proveedoresmensajeria.dto';
import { MessageInput } from './dto/proveedoresmensajeriaparametros.dto';
const SibApiV3Sdk = require('sib-api-v3-typescript');


@Injectable()
export class ProveedoresMensajeriaService {
    constructor(
        private prismaService: PrismaService,
    ) { }

    async getProveedoresMensajeria(): Promise<any> {

        return this.prismaService.proveedoresMensajeria.findMany({
        });
    }

    async getProveedorMensajeriaById(proveedor_mensajeria_id: number): Promise<any> {
        let proveedor_mensajeria = await this.prismaService.proveedoresMensajeria.findUnique({
            where: { proveedor_mensajeria_id: proveedor_mensajeria_id },
        })

        if (proveedor_mensajeria === null) {
            throw new UnauthorizedException(`El proveedor de mensajería con id ${proveedor_mensajeria_id} no existe`);
        }
        return proveedor_mensajeria;
    }

    async createProveedorMensajeria(data: CreateProveedoresMensajeriaInput): Promise<any> {
        let parametros = [];

        let proveedoresParamtros = await this.prismaService.proveedoresMensajeriaParametros.findMany({
            select: { pro_mensajeria_parametro_id: true }
        })

        await proveedoresParamtros.reduce(async (promise0, valor) => {
            await promise0;
            parametros.push({
                pro_mensajeria_parametro_id: valor.pro_mensajeria_parametro_id

            })
        }, Promise.resolve());

        return this.prismaService.proveedoresMensajeria.create({
            data: {
                nombre: data.nombre,
                medio_mensajeria: data.medio_mensajeria,
                ProveedoresMensajeriaParametrosValores: {
                    create: parametros
                }
            }
        })
    }

    async updateProveedorMensajeria(data: UpdateProveedorMensajeriaInput): Promise<any> {

        await this.getProveedorMensajeriaById(data.proveedor_mensajeria_id);

        return this.prismaService.proveedoresMensajeria.update({
            where: { proveedor_mensajeria_id: data.proveedor_mensajeria_id },
            data: {
                nombre: data.nombre,
                medio_mensajeria: data.medio_mensajeria
            },
        });
    }

    async deleteProveedorMensajeria(proveedor_mensajeria_id: number): Promise<any> {

        await this.getProveedorMensajeriaById(proveedor_mensajeria_id);

        return this.prismaService.proveedoresMensajeria.delete({
            where: { proveedor_mensajeria_id: proveedor_mensajeria_id },
        });
    }

    async setMessage(data: MessageInput) {
        let usuarios = JSON.parse(data.usuarios)
        let params = JSON.parse(data.params)
        switch (data.proveedor_mensajeria_id) {
            case 1:
                let info = await this.sendinBlueMail(usuarios, params, data.proveedor_mensajeria_id, data.nombre)
                if (info.correo_enviado_id !== undefined) {
                    return { nombre: "Enviado correctamente" };
                }
                else {
                    return { error: "no se pudo enviar el mensaje" };
                }
            case 2:
                return this.sendSMS();
        }
    }

    async sendSMS() {
        return { nombre: "En construcción" };
    }

    async sendinBlueMail(usuarios: any, params: any, proveedor_mensajeria_id: number, nombre: string) {

        let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        let apiKey = apiInstance.authentications['apiKey'];

        let parametroLlave = await this.prismaService.proveedoresMensajeriaParametrosValores.findFirst({
            where: {
                ProveedoresMensajeria: {
                    proveedor_mensajeria_id: proveedor_mensajeria_id
                }, ProveedoresMensajeriaParametros: { nombre: "llave" }
            },
            select: { valor: true }
        });

        apiKey.apiKey = parametroLlave.valor
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
            return error;
        }
    }

    async saveCorreosEnviados(usuarios: any, sendinBlue_Mail: any, sendSmtpEmail: any) {
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

    async saveEventos() {
        return "En construcción";
    }
}
