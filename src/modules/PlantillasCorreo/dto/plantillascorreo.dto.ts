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

    @Field(() => String, { nullable: true })
    descripcion?: string
}

@InputType()
export class UpdatePlantillaCorreoInput {

    @Field(() => Number)
    @IsNotEmpty()
    plantilla_correo_id: number

    @Field(() => String, { nullable: true })
    codigo?: string

    @Field(() => String, { nullable: true })
    nombre?: string

    @Field(() => String, { nullable: true })
    asunto?: string

    @Field(() => String, { nullable: true })
    cuerpo?: string

    @Field(() => String, { nullable: true })
    descripcion?: string
}