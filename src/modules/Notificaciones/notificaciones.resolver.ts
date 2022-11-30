import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { NotificacionesCorreoInput, NotificacionesSmsInput } from './dto/notificaciones.dto';
import { NotificacionesRespuesta } from './entities/notificaciones.entity';
import { NotificacionesService } from './notificaciones.service';


@Resolver(() => NotificacionesRespuesta)
export class NotificacionesResolver {

    constructor(
        private readonly notificacionesService: NotificacionesService
    ) { }

    @Mutation(() => NotificacionesRespuesta)
    async sendNotificacionCorreo(@Args("data") data: NotificacionesCorreoInput): Promise<any> {
        return this.notificacionesService.sendNotificacionCorreo(data);
    }

    @Mutation(() => NotificacionesRespuesta)
    async sendNotificacionSms(@Args("data") data: NotificacionesSmsInput): Promise<any> {
        return this.notificacionesService.sendNotificacionSms(data);
    }
}