import 'reflect-metadata'
import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class CreatePlantillaCorreoInput {

    @Field(() => String)
    @IsNotEmpty()
    codigo: string

    @Field(() => String)
    @IsNotEmpty()
    nombre: string

    @Field(() => String)
    @IsNotEmpty()
    asunto: string

    @Field(() => String)
    @IsNotEmpty()
    cuerpo: string

    @Field(() => String)
    @IsNotEmpty()
    descripcion: string
}

@InputType()
export class UpdatePlantillaCorreoInput {

    @Field(() => Number)
    @IsNotEmpty()
    plantilla_correo_id: number

    @Field(() => String)
    codigo?: string

    @Field(() => String)
    nombre?: string

    @Field(() => String)
    asunto?: string

    @Field(() => String)
    cuerpo?: string

    @Field(() => String)
    descripcion?: string
}