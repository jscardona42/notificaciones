import { Field, InputType, Int } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"

@InputType()
export class NotificacionesCorreoInput {

    @Field(() => String)
    @IsNotEmpty()
    correo: string

    @Field(() => String)
    @IsNotEmpty()
    nombre_usuario: string

    @Field(() => String, { nullable: true })
    params: string

    @Field(() => String, { nullable: true })
    nombre_plantilla?: string

    @Field(() => Int, { nullable: true })
    plantilla_correo_id?: number
}

@InputType()
export class NotificacionesSmsInput {

    @Field(() => String)
    @IsNotEmpty()
    telefono: string

    @Field(() => Int)
    plantilla_sms_id: number
}