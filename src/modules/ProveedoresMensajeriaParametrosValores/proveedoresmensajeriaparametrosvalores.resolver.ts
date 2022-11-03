import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateProveedoresMensajeriaParametrosValoresInput, UpdateProveedoresMensajeriaParametrosValoresInput } from './dto/proveedoresmensajeriaparametrosvalores.dto';
import { ProveedoresMensajeriaParametrosValores } from './entities/proveedoresmensajeriaparametrosvalores.entity';
import { ProveedoresMensajeriaParametrosValoresService } from './proveedoresmensajeriaparametrosvalores.service';


@Resolver(() => ProveedoresMensajeriaParametrosValores)
export class ProveedoresMensajeriaParametrosValoresResolver {

    constructor(
        private readonly proveedoresMensajeriaParametrosValoresService: ProveedoresMensajeriaParametrosValoresService
    ) { }

    @Query(() => [ProveedoresMensajeriaParametrosValores])
    async getProveedoresMensajeriaParametrosValores(): Promise<any> {
        return this.proveedoresMensajeriaParametrosValoresService.getProveedoresMensajeriaParametrosValores();
    }

    @Query(() => ProveedoresMensajeriaParametrosValores)
    async getProveedorMensajeriaParametroValorById(@Args("pro_men_parametro_valor_id") pro_men_parametro_valor_id: number): Promise<any> {
        return this.proveedoresMensajeriaParametrosValoresService.getProveedorMensajeriaParametroValorById(pro_men_parametro_valor_id);
    }

    @Mutation(() => ProveedoresMensajeriaParametrosValores)
    async createProveedoresMensajeriaParametrosValores(@Args("data") data: CreateProveedoresMensajeriaParametrosValoresInput): Promise<any> {
        return this.proveedoresMensajeriaParametrosValoresService.createProveedoresMensajeriaParametrosValores(data);
    }

    @Mutation(() => ProveedoresMensajeriaParametrosValores)
    async updateProveedoresMensajeriaParametrosValores(@Args("data") data: UpdateProveedoresMensajeriaParametrosValoresInput): Promise<any> {
        return this.proveedoresMensajeriaParametrosValoresService.updateProveedoresMensajeriaParametrosValores(data);
    }

    @Mutation(() => ProveedoresMensajeriaParametrosValores)
    async deleteProveedoresMensajeriaParametrosValores(@Args("pro_men_parametro_valor_id") pro_men_parametro_valor_id: number): Promise<any> {
        return this.proveedoresMensajeriaParametrosValoresService.deleteProveedoresMensajeriaParametrosValores(pro_men_parametro_valor_id);
    }
}