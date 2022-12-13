import 'reflect-metadata'
import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class PlantillasWhatsapp {

    @Field(() => Int)
    plantilla_whatsapp_id: number

    @Field(() => String)
    titulo: string

    @Field(() => String)
    cuerpo_notificacion: string

    @Field(() => String, { nullable: true })
    vinculo?: string
}
