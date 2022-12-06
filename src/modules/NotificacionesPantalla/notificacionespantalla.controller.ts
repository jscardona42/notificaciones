import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateNotificacionesPantallaInput } from './dto/notificacionespantalla.dto';
import { NotificacionesPantallaService } from './notificacionespantalla.service';

@Controller('notificacionespantalla')
export class NotificacionesPantallaController {
    constructor(
        private notificacionesPantallaService: NotificacionesPantallaService
    ) { }

    @Get('get')
    async getNotificacionesPantalla(): Promise<any> {
        return this.notificacionesPantallaService.getNotificacionesPantalla();
    }

    @Get("getById")
    async getNotificacionPantallaById(@Body("notificacion_pantalla_id") notificacion_pantalla_id: number): Promise<any> {
        return this.notificacionesPantallaService.getNotificacionPantallaById(notificacion_pantalla_id);
    }

    @Post('create')
    async createNotificacionPantalla(@Body("data") data: CreateNotificacionesPantallaInput): Promise<any> {
        return this.notificacionesPantallaService.createNotificacionPantalla(data);
    }

    @Get("getByUsuarioId")
    async getNotificacionesPantallaByUserId(@Body("usuario_destino") usuario_destino: number) {
        return this.notificacionesPantallaService.getNotificacionesPantallaByUserId(usuario_destino);
    }

    @Post("check")
    async checkNotificacionesPantalla(@Body("usuario_destino") usuario_destino: number) {
        return this.notificacionesPantallaService.checkNotificacionesPantalla(usuario_destino);
    }
} 