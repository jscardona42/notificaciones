import 'reflect-metadata';
import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'
import { MedioMensajeria } from '@prisma/client'
import { CreateProveedoresMensajeriaParametrosValoresInput, UpdateProveedoresMensajeriaParametrosValoresInput } from './proveedoresmensajeriaparametrosvalores.dto'

registerEnumType(MedioMensajeria, {
    name: 'MedioMensajeria'
})

@InputType()
export class CreateProveedoresMensajeriaInput {

    @Field(() => String)
    @IsNotEmpty()
    nombre: string

    @Field(() => MedioMensajeria)
    @IsNotEmpty()
    medio_mensajeria: MedioMensajeria

    @Field(() => [CreateProveedoresMensajeriaParametrosValoresInput], { nullable: true })
    ProveedoresMensajeriaParametrosValores?: CreateProveedoresMensajeriaParametrosValoresInput[]
}

@InputType()
export class UpdateProveedorMensajeriaInput {

    @Field(() => Int)
    proveedor_mensajeria_id: number

    @Field(() => String, { nullable: true })
    nombre?: string

    @Field(() => MedioMensajeria, { nullable: true })
    medio_mensajeria?: MedioMensajeria

    @Field(() => [UpdateProveedoresMensajeriaParametrosValoresInput], { nullable: true })
    ProveedoresMensajeriaParametrosValores?: UpdateProveedoresMensajeriaParametrosValoresInput[]
}