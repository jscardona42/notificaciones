import 'reflect-metadata'
import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class NotificacionesRespuesta {

    @Field(() => String, { nullable: true })
    notificacion?: string

    @Field(() => String, { nullable: true })
    error?: string

    @Field(() => String, { nullable: true })
    error_code?: string
}
