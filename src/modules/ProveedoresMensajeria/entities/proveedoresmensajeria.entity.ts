import 'reflect-metadata'
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'
import { MedioMensajeria } from '@prisma/client'
import { ProveedoresMensajeriaParametros } from '../../ProveedoresMensajeriaParametros/entities/proveedoresmensajeriaparametros.entity'

registerEnumType(MedioMensajeria, {
    name: 'MedioMensajeria'
})

@ObjectType()
export class ProveedoresMensajeria {

    @Field(() => Number)
    proveedor_mensajeria_id: number

    @Field(() => String)
    nombre: string

    @Field(() => MedioMensajeria)
    medio_mensajeria: MedioMensajeria

    @Field(() => [ProveedoresMensajeriaParametros], { nullable: true })
    ProveedoresMensajeriaParametros?: ProveedoresMensajeriaParametros[]
}
