import 'reflect-metadata'
import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class ProveedoresMensajeriaParametros {

    @Field(() => Number)
    proveedor_mensajeria_parametro_id: number

    @Field(() => String)
    nombre: string

    @Field(() => String)
    valor: string

    @Field(() => String)
    descripcion: string
}
