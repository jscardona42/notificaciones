import { Field, InputType, Int } from "@nestjs/graphql"

@InputType()
export class NotificacionesCorreoInput {

    @Field(() => String, { nullable: true })
    usuario: string

    @Field(() => String, { nullable: true })
    params: string

    @Field(() => String, { nullable: true })
    nombre_plantilla: string

    @Field(() => Int, { nullable: true })
    plantilla_id: number
}

@InputType()
export class NotificacionesSmsInput {

    @Field(() => String, { nullable: true })
    usuario: string

    @Field(() => String, { nullable: true })
    params: string

    @Field(() => Int, { nullable: true })
    plantilla_id: number
}

@InputType()
export class NotificacionesPantallaInput {

    @Field(() => String, { nullable: true })
    usuario: string

    @Field(() => Int, { nullable: true })
    plantilla_id: number
}