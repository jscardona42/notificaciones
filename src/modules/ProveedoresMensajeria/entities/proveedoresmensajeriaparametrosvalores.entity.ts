import 'reflect-metadata'
import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class ProveedoresMensajeriaParametrosValores {

    @Field(() => Number)
    pro_men_parametro_valor_id: number

    @Field(() => Number)
    proveedor_mensajeria_id: number

    @Field(() => String)
    valor: string

    @Field(() => Number)
    pro_mensajeria_parametro_id: number
}
