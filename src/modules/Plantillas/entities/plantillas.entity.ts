import 'reflect-metadata'
import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class Plantillas {

    @Field(() => Number)
    plantilla_id: number

    @Field(() => String)
    codigo: string

    @Field(() => String)
    nombre: string

    @Field(() => String)
    asunto: string

    @Field(() => String)
    cuerpo: string

    @Field(() => String)
    descripcion: string
}
