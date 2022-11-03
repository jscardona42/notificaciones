import 'reflect-metadata'
import { Field, InputType, Int } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class CreateProveedoresMensajeriaParametroInput {

    @Field(() => String)
    @IsNotEmpty()
    nombre: string

    @Field(() => String)
    @IsNotEmpty()
    valor: string

    @Field(() => String)
    @IsNotEmpty()
    descripcion: string
}

@InputType()
export class UpdateProveedorMensajeriaParametroInput {

    @Field(() => Int)
    proveedor_mensajeria_parametro_id: number

    @Field(() => String, { nullable: true })
    nombre?: string

    @Field(() => String, { nullable: true })
    valor?: string

    @Field(() => String, { nullable: true })
    descripcion?: string
}

@InputType()
export class MessageInput {

    @Field(() => Number, { nullable: true })
    proveedor_mensajeria_id: number

    @Field(() => String, { nullable: true })
    usuarios: string

    @Field(() => String, { nullable: true })
    params: string

    @Field(() => String, { nullable: true })
    nombre: string
}