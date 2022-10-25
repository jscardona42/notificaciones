import 'reflect-metadata'
import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'
import { TipoMensajeria } from '@prisma/client'
import { CreateProveedoresMensajeriaParametroInput, UpdateProveedorMensajeriaParametroInput } from './proveedoresmensajeriaparametros.dto'

registerEnumType(TipoMensajeria, {
    name: 'TipoMensajeria'
})

@InputType()
export class CreateProveedoresMensajeriaInput {

    @Field(() => String)
    @IsNotEmpty()
    nombre: string

    @Field(() => TipoMensajeria)
    @IsNotEmpty()
    tipo_mensajeria: TipoMensajeria

    @Field(() => [CreateProveedoresMensajeriaParametroInput])
    @IsNotEmpty()
    ProveedoresMensajeriaParametros: CreateProveedoresMensajeriaParametroInput[]
}

@InputType()
export class UpdateProveedorMensajeriaInput {

    @Field(() => Int)
    proveedor_mensajeria_id: number

    @Field(() => String, { nullable: true })
    nombre?: string

    @Field(() => TipoMensajeria, { nullable: true })
    tipo_mensajeria?: TipoMensajeria

    @Field(() => [UpdateProveedorMensajeriaParametroInput], { nullable: true })
    ProveedoresMensajeriaParametros?: UpdateProveedorMensajeriaParametroInput[]
}