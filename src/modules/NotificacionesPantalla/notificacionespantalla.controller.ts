import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CreateNotificacionesPantallaArrayInput, UpdateNotificacionesPantallaInput } from './dto/notificacionespantalla.dto';
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

    @Post("getById")
    async getNotificacionPantallaById(@Body("notificacion_pantalla_id") notificacion_pantalla_id: number): Promise<any> {
        return this.notificacionesPantallaService.getNotificacionPantallaById(notificacion_pantalla_id);
    }

    @Post('create')
    async createNotificacionPantalla(@Body("data") data: CreateNotificacionesPantallaArrayInput): Promise<any> {
        return this.notificacionesPantallaService.createNotificacionPantalla(data);
    }

    @Put('update')
    async updateNotificacionPantalla(@Body("data") data: UpdateNotificacionesPantallaInput): Promise<any> {
        return this.notificacionesPantallaService.updateNotificacionPantalla(data);
    }

    @Post("getByUsuarioId")
    async getNotificacionesPantallaByUserId(@Body("usuario_destino") usuario_destino: number) {
        return this.notificacionesPantallaService.getNotificacionesPantallaByUserId(usuario_destino);
    }

    @Post("checkvisto")
    async checkNotificacionesPantallaVisto(@Body("usuario_destino") usuario_destino: number) {
        return this.notificacionesPantallaService.checkNotificacionesPantallaVisto(usuario_destino);
    }

    @Post("checkleido")
    async checkNotificacionesPantallaLeido(@Body("notificacion_pantalla_id") notificacion_pantalla_id: number) {
        return this.notificacionesPantallaService.checkNotificacionesPantallaLeido(notificacion_pantalla_id);
    }
} 