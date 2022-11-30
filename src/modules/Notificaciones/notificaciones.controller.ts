import { Controller, Post, Body, Get } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';

@Controller('notificaciones')
export class NotificacionesController {
    constructor(
        private readonly notificacionesService: NotificacionesService
    ) { }

    @Post()
    async saveEventos(@Body() data: any) {
        return this.notificacionesService.saveEventos(data);
    }

}