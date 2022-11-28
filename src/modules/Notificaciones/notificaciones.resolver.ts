import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateNotificacionesInput, UpdateNotificacionesInput } from './dto/notificaciones.dto';
import { Notificaciones } from './entities/notificaciones.entity';
import { NotificacionesService } from './notificaciones.service';

@Resolver(() => Notificaciones)
export class NotificacionesResolver {

    constructor(
        private readonly notificacionesService: NotificacionesService
    ) { }

    @Query(() => [Notificaciones])
    async getNotificaciones(): Promise<any> {
        return this.notificacionesService.getNotificaciones();
    }

    @Query(() => Notificaciones)
    async getNotificacionById(@Args("notificacion_id") notificacion_id: number): Promise<any> {
        return this.notificacionesService.getNotificacionById(notificacion_id);
    }

    @Mutation(() => Notificaciones)
    async createNotificaciones(@Args("data") data: CreateNotificacionesInput): Promise<Notificaciones> {
        return this.notificacionesService.createNotificaciones(data);
    }

    @Mutation(() => Notificaciones)
    async updateNotificaciones(@Args("data") data: UpdateNotificacionesInput): Promise<any> {
        return this.notificacionesService.updateNotificaciones(data);
    }

    @Query(() => [Notificaciones])
    async getNotificacionesByUserId(@Args("usuario_destino") usuario_destino: number): Promise<any> {
        return this.notificacionesService.getNotificacionesByUserId(usuario_destino);
    }

    @Mutation(() => Notificaciones)
    async checkNotificaciones(@Args("usuario_destino") usuario_destino: number): Promise<any> {
        return this.notificacionesService.checkNotificaciones(usuario_destino);
    }
}