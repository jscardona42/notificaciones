import 'reflect-metadata'
import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class CreatePlantillasWhatsappInput {

    @Field(() => String)
    @IsNotEmpty()
    titulo: string

    @Field(() => String)
    @IsNotEmpty()
    cuerpo_notificacion: string

    @Field(() => String, { nullable: true })
    vinculo?: string
}

@InputType()
export class UpdatePlantillasWhatsappInput {

    @Field(() => Number)
    @IsNotEmpty()
    plantilla_whatsapp_id: number

    @Field(() => String, { nullable: true })
    titulo?: string

    @Field(() => String, { nullable: true })
    cuerpo_notificacion?: string

    @Field(() => String, { nullable: true })
    vinculo?: string
}