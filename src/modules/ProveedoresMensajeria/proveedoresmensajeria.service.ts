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
            include: { ProveedoresMensajeriaParametros: true }
        });
    }

    async getProveedorMensajeriaById(proveedor_mensajeria_id: number): Promise<any> {
        let usuarios = await this.prismaService.proveedoresMensajeria.findUnique({
            where: { proveedor_mensajeria_id: proveedor_mensajeria_id },
            include: { ProveedoresMensajeriaParametros: true }
        })

        if (usuarios === null) {
            throw new UnauthorizedException(`El proveedor de mensajería con id ${proveedor_mensajeria_id} no existe`);
        }
        return usuarios;
    }

    async createProveedorMensajeria(data: CreateProveedoresMensajeriaInput): Promise<any> {
        return this.prismaService.proveedoresMensajeria.create({
            data: {
                ...data
            },
            include: { ProveedoresMensajeriaParametros: true }
        });
    }

    async updateProveedorMensajeria(data: UpdateProveedorMensajeriaInput): Promise<any> {

        await this.getProveedorMensajeriaById(data.proveedor_mensajeria_id);

        return this.prismaService.proveedoresMensajeria.update({
            where: { proveedor_mensajeria_id: data.proveedor_mensajeria_id },
            data: {
                ...data
            },
            include: { ProveedoresMensajeriaParametros: true }
        });
    }

    async deleteTipoUsuario(proveedor_mensajeria_id: number): Promise<any> {

        await this.getProveedorMensajeriaById(proveedor_mensajeria_id);

        return this.prismaService.proveedoresMensajeria.delete({
            where: { proveedor_mensajeria_id: proveedor_mensajeria_id },
            include: { ProveedoresMensajeriaParametros: true }
        });
    }
}
