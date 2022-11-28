import 'reflect-metadata'
import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class PlantillasNotificaciones {

    @Field(() => Number)
    plantilla_notificacion_id: number

    @Field(() => String)
    titulo: string

    @Field(() => Number)
    icono: number

    @Field(() => String)
    cuerpo_notificacion: string

    @Field(() => String)
    vinculo: string

}
