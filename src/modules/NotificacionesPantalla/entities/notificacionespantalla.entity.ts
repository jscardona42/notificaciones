import 'reflect-metadata'
import { ObjectType, Field } from '@nestjs/graphql'
import { PlantillasPantalla } from '../../PlantillasPantalla/entities/plantillaspantalla.entity'

@ObjectType()
export class NotificacionesPantalla {

    @Field(() => Number)
    notificacion_pantalla_id: number

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

    @Field(() => PlantillasPantalla, { nullable: true })
    PlantillasPantalla?: PlantillasPantalla

}
