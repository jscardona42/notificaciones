import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateNotificacionesPantallaInput, UpdateNotificacionesPantallaInput } from './dto/notificacionespantalla.dto';
import { NotificacionesPantalla } from './entities/notificacionespantalla.entity';
import { NotificacionesPantallaService } from './notificacionespantalla.service';

@Resolver(() => NotificacionesPantalla)
export class NotificacionesPantallaResolver {

    constructor(
        private readonly notificacionesPantallaService: NotificacionesPantallaService
    ) { }

    @Query(() => [NotificacionesPantalla])
    async getNotificacionesPantalla(): Promise<any> {
        return this.notificacionesPantallaService.getNotificacionesPantalla();
    }

    @Query(() => NotificacionesPantalla)
    async getNotificacionPantallaById(@Args("notificacion_pantalla_id") notificacion_pantalla_id: number): Promise<NotificacionesPantalla> {
        return this.notificacionesPantallaService.getNotificacionPantallaById(notificacion_pantalla_id);
    }

    @Mutation(() => NotificacionesPantalla)
    async createNotificacionPantalla(@Args("data") data: CreateNotificacionesPantallaInput): Promise<NotificacionesPantalla> {
        return this.notificacionesPantallaService.createNotificacionPantalla(data);
    }

    @Mutation(() => NotificacionesPantalla)
    async updateNotificacionPantalla(@Args("data") data: UpdateNotificacionesPantallaInput): Promise<any> {
        return this.notificacionesPantallaService.updateNotificacionPantalla(data);
    }

    @Query(() => [NotificacionesPantalla])
    async getNotificacionesPantallaByUserId(@Args("usuario_destino") usuario_destino: number): Promise<any> {
        return this.notificacionesPantallaService.getNotificacionesPantallaByUserId(usuario_destino);
    }

    @Mutation(() => NotificacionesPantalla)
    async checkNotificacionesPantalla(@Args("usuario_destino") usuario_destino: number): Promise<any> {
        return this.notificacionesPantallaService.checkNotificacionesPantalla(usuario_destino);
    }
}