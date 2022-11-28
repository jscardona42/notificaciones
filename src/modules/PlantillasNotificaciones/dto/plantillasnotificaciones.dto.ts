import 'reflect-metadata'
import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class CreatePlantillasNotificacionesInput {

    @Field(() => String)
    @IsNotEmpty()
    titulo: string

    @Field(() => String)
    @IsNotEmpty()
    cuerpo_notificacion: string

    @Field(() => String)
    @IsNotEmpty()
    icono: string

    @Field(() => String)
    @IsNotEmpty()
    vinculo: string
}

@InputType()
export class UpdatePlantillasNotificacionesInput {

    @Field(() => Number)
    @IsNotEmpty()
    plantilla_notificacion_id: number

    @Field(() => String, { nullable: true })
    titulo?: string

    @Field(() => String, { nullable: true })
    cuerpo_notificacion: string

    @Field(() => String, { nullable: true })
    icono: string

    @Field(() => String, { nullable: true })
    vinculo: string
}