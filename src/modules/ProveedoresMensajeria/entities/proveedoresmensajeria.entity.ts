import 'reflect-metadata'
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'
import { TipoMensajeria } from '@prisma/client'
import { ProveedoresMensajeriaParametros } from './proveedormensajeriaparametros.entity'

registerEnumType(TipoMensajeria, {
    name: 'TipoMensajeria'
})

@ObjectType()
export class ProveedoresMensajeria {

    @Field(() => Number)
    proveedor_mensajeria_id: number

    @Field(() => String)
    nombre: string

    @Field(() => TipoMensajeria)
    tipo_mensajeria: TipoMensajeria

    @Field(() => [ProveedoresMensajeriaParametros])
    ProveedoresMensajeriaParametros: ProveedoresMensajeriaParametros[]
}
