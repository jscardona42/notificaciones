import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateProveedoresMensajeriaParametroInput, UpdateProveedorMensajeriaParametroInput } from './dto/proveedoresmensajeriaparametros.dto';
import { ProveedoresMensajeriaParametros } from './entities/proveedoresmensajeriaparametros.entity';
import { ProveedoresMensajeriaParametrosService } from './proveedoresmensajeriaparametros.service';


@Resolver(() => ProveedoresMensajeriaParametros)
export class ProveedoresMensajeriaParametrosResolver {

    constructor(
        private readonly proveedoresMensajeriaParametrosService: ProveedoresMensajeriaParametrosService
    ) { }

    @Query(() => [ProveedoresMensajeriaParametros])
    async getProveedoresMensajeriaParametros(): Promise<any> {
        return this.proveedoresMensajeriaParametrosService.getProveedoresMensajeriaParametros();
    }

    @Query(() => ProveedoresMensajeriaParametros)
    async getProveedorMensajeriaParametroById(@Args("pro_men_parametro_valor_id") pro_men_parametro_valor_id: number): Promise<any> {
        return this.proveedoresMensajeriaParametrosService.getProveedorMensajeriaParametroById(pro_men_parametro_valor_id);
    }

    @Mutation(() => ProveedoresMensajeriaParametros)
    async createProveedorMensajeriaParametro(@Args("data") data: CreateProveedoresMensajeriaParametroInput): Promise<any> {
        return this.proveedoresMensajeriaParametrosService.createProveedorMensajeriaParametro(data);
    }

    @Mutation(() => ProveedoresMensajeriaParametros)
    async updateProveedorMensajeriaParametro(@Args("data") data: UpdateProveedorMensajeriaParametroInput): Promise<any> {
        return this.proveedoresMensajeriaParametrosService.updateProveedorMensajeriaParametro(data);
    }

    @Mutation(() => ProveedoresMensajeriaParametros)
    async deleteProveedorMensajeriaParametro(@Args("pro_men_parametro_valor_id") pro_men_parametro_valor_id: number): Promise<any> {
        return this.proveedoresMensajeriaParametrosService.deleteProveedorMensajeriaParametro(pro_men_parametro_valor_id);
    }
}