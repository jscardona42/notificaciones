import 'reflect-metadata'
import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class ProveedoresMensajeriaParametros {

    @Field(() => Number)
    pro_men_parametro_id: number

    @Field(() => String)
    nombre: string

    @Field(() => String)
    descripcion: string
}
