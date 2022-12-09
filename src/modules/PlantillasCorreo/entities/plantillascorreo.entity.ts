import 'reflect-metadata'
import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType({ description: "Plantillas para el envío de correos" })
export class PlantillasCorreo {

    @Field(() => Number)
    plantilla_correo_id: number

    @Field(() => String, { description: "Código de la plantilla de correo" })
    codigo: string

    @Field(() => String, { description: "Nombre de la pnatilla de correo" })
    nombre: string

    @Field(() => String, { description: "Asunto de la pantilla de correo" })
    asunto: string

    @Field(() => String, { description: "Cuerpo de la pantilla de correo" })
    cuerpo: string

    @Field(() => String, { nullable: true, description: "Descripción una pantilla de correo" })
    descripcion?: string
}
