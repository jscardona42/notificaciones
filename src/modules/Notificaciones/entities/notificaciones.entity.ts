import 'reflect-metadata'
import { ObjectType, Field } from '@nestjs/graphql'
import { PlantillasNotificaciones } from '../../PlantillasNotificaciones/entities/plantillasnotificaciones.entity'

@ObjectType()
export class Notificaciones {

    @Field(() => Number)
    notificacion_id: number

    @Field(() => String)
    fecha_generacion: string

    @Field(() => String, { nullable: true })
    fecha_leido?: string

    @Field(() => Number)
    usuario_destino: number

    @Field(() => String)
    leido: string

    @Field(() => String)
    plantilla_notificacion_id: string

    @Field(() => PlantillasNotificaciones, { nullable: true })
    plantillasNotificaciones?: PlantillasNotificaciones

}
