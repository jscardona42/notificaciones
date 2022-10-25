import 'reflect-metadata'
import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class CreatePlantillaInput {

    @Field(() => String)
    @IsNotEmpty()
    codigo: string

    @Field(() => String)
    @IsNotEmpty()
    nombre: string

    @Field(() => Date)
    @IsNotEmpty()
    asunto: Date

    @Field(() => String)
    @IsNotEmpty()
    cuerpo: string

    @Field(() => String)
    @IsNotEmpty()
    descripcion: string
}