import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateProveedoresMensajeriaParametrosValoresInput, UpdateProveedoresMensajeriaParametrosValoresInput } from './dto/proveedoresmensajeriaparametrosvalores.dto';
const SibApiV3Sdk = require('sib-api-v3-typescript');


@Injectable()
export class ProveedoresMensajeriaParametrosValoresService {
    constructor(
        private prismaService: PrismaService,
    ) { }

    async getProveedoresMensajeriaParametrosValores(): Promise<any> {

        return this.prismaService.proveedoresMensajeriaParametrosValores.findMany({
        });
    }

    async getProveedorMensajeriaParametroValorById(pro_men_parametro_valor_id: number): Promise<any> {
        let pro_men_par_valor = await this.prismaService.proveedoresMensajeriaParametrosValores.findUnique({
            where: { pro_men_parametro_valor_id: pro_men_parametro_valor_id },
        })

        if (pro_men_par_valor === null) {
            throw new UnauthorizedException(`El proveedor de mensajería con id ${pro_men_parametro_valor_id} no existe`);
        }
        return pro_men_par_valor;
    }

    async createProveedoresMensajeriaParametrosValores(data: CreateProveedoresMensajeriaParametrosValoresInput): Promise<any> {
            return this.prismaService.proveedoresMensajeriaParametrosValores.create({
                data: {
                    ...data
                }
            });
        }
    

    async updateProveedoresMensajeriaParametrosValores(data: UpdateProveedoresMensajeriaParametrosValoresInput): Promise<any> {

        await this.getProveedorMensajeriaParametroValorById(data.pro_men_parametro_valor_id);

        return this.prismaService.proveedoresMensajeriaParametrosValores.update({
            where: { pro_men_parametro_valor_id: data.pro_men_parametro_valor_id },
            data: {
                ...data
            },
        });
    }

    async deleteProveedoresMensajeriaParametrosValores(pro_men_parametro_valor_id: number): Promise<any> {

        await this.getProveedorMensajeriaParametroValorById(pro_men_parametro_valor_id);

        return this.prismaService.proveedoresMensajeriaParametrosValores.delete({
            where: { pro_men_parametro_valor_id: pro_men_parametro_valor_id },
        });
    }
}