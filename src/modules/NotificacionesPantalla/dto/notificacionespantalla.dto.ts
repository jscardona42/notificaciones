import 'reflect-metadata'
import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class CreateNotificacionesPantallaInput {

    @Field(() => Number)
    @IsNotEmpty()
    usuario_destino: number

    @Field(() => Number)
    @IsNotEmpty()
    plantilla_pantalla_id: number
}

@InputType()
export class UpdateNotificacionesPantallaInput {

    @Field(() => Number)
    @IsNotEmpty()
    notificacion_pantalla_id: number

    @Field(() => Date, { nullable: true })
    fecha_generacion?: Date

    @Field(() => Date, { nullable: true })
    fecha_leido?: Date

    @Field(() => Number, { nullable: true })
    usuario_destino?: number

    @Field(() => Boolean, { nullable: true })
    leido?: boolean

    @Field(() => Number, { nullable: true })
    plantilla_pantalla_id?: number
}