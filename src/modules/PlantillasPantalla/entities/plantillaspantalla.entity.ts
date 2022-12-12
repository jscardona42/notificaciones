import 'reflect-metadata'
import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class PlantillasPantalla {

    @Field(() => Int)
    plantilla_pantalla_id: number

    @Field(() => String)
    titulo: string

    @Field(() => String)
    icono: string

    @Field(() => String)
    cuerpo_notificacion: string

    @Field(() => String, { nullable: true })
    vinculo?: string

}
