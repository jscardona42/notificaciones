import 'reflect-metadata'
import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class CreateProveedoresMensajeriaParametrosValoresInput {

    @Field(() => Number)
    @IsNotEmpty()
    proveedor_mensajeria_id: number

    @Field(() => Number)
    @IsNotEmpty()
    pro_mensajeria_parametro_id: number

    @Field(() => String)
    @IsNotEmpty()
    valor: string
}

@InputType()
export class UpdateProveedoresMensajeriaParametrosValoresInput {

    @Field(() => Number)
    @IsNotEmpty()
    pro_men_parametro_valor_id: number

    @Field(() => Number, { nullable: true })
    proveedor_mensajeria_id?: number

    @Field(() => Number, { nullable: true })
    pro_mensajeria_parametro_id?: number

    @Field(() => String, { nullable: true })
    valor?: string
}