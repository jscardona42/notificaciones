import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateProveedoresMensajeriaInput, UpdateProveedorMensajeriaInput } from './dto/proveedoresmensajeria.dto';
import { MessageInput } from './dto/proveedoresmensajeriaparametros.dto';
import { ProveedoresMensajeria } from './entities/proveedoresmensajeria.entity';
import { ProveedoresMensajeriaService } from './proveedoresmensajeria.service';


@Resolver(() => ProveedoresMensajeria)
export class ProveedoresMensajeriaResolver {

    constructor(
        private readonly proveedoresMensajeriaService: ProveedoresMensajeriaService
    ) { }

    @Query(() => [ProveedoresMensajeria])
    async getProveedoresMensajeria(): Promise<any> {
        return this.proveedoresMensajeriaService.getProveedoresMensajeria();
    }

    @Query(() => ProveedoresMensajeria)
    async getProveedorMensajeriaById(
        @Args("proveedor_mensajeria_id") proveedor_mensajeria_id: number): Promise<any> {
        return this.proveedoresMensajeriaService.getProveedorMensajeriaById(proveedor_mensajeria_id);
    }

    @Mutation(() => ProveedoresMensajeria)
    async createProveedorMensajeria(@Args("data") data: CreateProveedoresMensajeriaInput): Promise<any> {
        return this.proveedoresMensajeriaService.createProveedorMensajeria(data);
    }

    @Mutation(() => ProveedoresMensajeria)
    async updateProveedorMensajeria(@Args("data") data: UpdateProveedorMensajeriaInput): Promise<any> {
        return this.proveedoresMensajeriaService.updateProveedorMensajeria(data);
    }

    @Mutation(() => ProveedoresMensajeria)
    async deleteProveedorMensajeria(@Args("proveedor_mensajeria_id") proveedor_mensajeria_id: number): Promise<any> {
        return this.proveedoresMensajeriaService.deleteProveedorMensajeria(proveedor_mensajeria_id);
    }

    @Mutation(() => ProveedoresMensajeria)
    async sendNotificacion (@Args("data") data: MessageInput): Promise<any> {
        return this.proveedoresMensajeriaService.sendNotificacion (data);
    }
}