import 'reflect-metadata'
import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class CreateNotificacionesInput {

    @Field(() => Number)
    @IsNotEmpty()
    usuario_destino: number

    @Field(() => Number)
    @IsNotEmpty()
    plantilla_notificacion_id: number
}

@InputType()
export class UpdateNotificacionesInput {

    @Field(() => Number)
    @IsNotEmpty()
    notificacion_id: number

    @Field(() => String, { nullable: true })
    fecha_generacion?: string

    @Field(() => String, { nullable: true })
    fehca_leido?: string

    @Field(() => Number, { nullable: true })
    usuario_destino?: number

    @Field(() => Boolean, { nullable: true })
    leido?: boolean

    @Field(() => Number, { nullable: true })
    plantilla_notificacion_id?: number
}