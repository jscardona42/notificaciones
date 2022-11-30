import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateProveedoresMensajeriaInput, UpdateProveedorMensajeriaInput } from './dto/proveedoresmensajeria.dto';


@Injectable()
export class ProveedoresMensajeriaService {
    constructor(
        private prismaService: PrismaService,
    ) { }

    async getProveedoresMensajeria(): Promise<any> {
        return this.prismaService.proveedoresMensajeria.findMany({
            orderBy: { proveedor_mensajeria_id: "asc" }
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
}
