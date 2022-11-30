import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateProveedoresMensajeriaParametroInput, UpdateProveedorMensajeriaParametroInput } from './dto/proveedoresmensajeriaparametros.dto';


@Injectable()
export class ProveedoresMensajeriaParametrosService {
    constructor(
        private prismaService: PrismaService,
    ) { }

    async getProveedoresMensajeriaParametros(): Promise<any> {
        return this.prismaService.proveedoresMensajeriaParametros.findMany({
            orderBy: { pro_mensajeria_parametro_id: "asc" }
        });
    }

    async getProveedorMensajeriaParametroById(pro_mensajeria_parametro_id: number): Promise<any> {
        let pro_men_par_valor = await this.prismaService.proveedoresMensajeriaParametros.findUnique({
            where: { pro_mensajeria_parametro_id: pro_mensajeria_parametro_id },
        })

        if (pro_men_par_valor === null) {
            throw new UnauthorizedException(`El proveedor de mensajería con id ${pro_mensajeria_parametro_id} no existe`);
        }
        return pro_men_par_valor;
    }

    async createProveedorMensajeriaParametro(data: CreateProveedoresMensajeriaParametroInput): Promise<any> {
        return this.prismaService.proveedoresMensajeriaParametros.create({
            data: {
                ...data
            }
        });
    }

    async updateProveedorMensajeriaParametro(data: UpdateProveedorMensajeriaParametroInput): Promise<any> {

        await this.getProveedorMensajeriaParametroById(data.pro_mensajeria_parametro_id);

        return this.prismaService.proveedoresMensajeriaParametros.update({
            where: { pro_mensajeria_parametro_id: data.pro_mensajeria_parametro_id },
            data: {
                ...data
            },
        });
    }

    async deleteProveedorMensajeriaParametro(pro_mensajeria_parametro_id: number): Promise<any> {

        await this.getProveedorMensajeriaParametroById(pro_mensajeria_parametro_id);

        return this.prismaService.proveedoresMensajeriaParametros.delete({
            where: { pro_mensajeria_parametro_id: pro_mensajeria_parametro_id },
        });
    }
}