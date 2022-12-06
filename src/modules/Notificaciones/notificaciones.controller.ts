import { Controller, Post, Body } from '@nestjs/common';
import { NotificacionesCorreoInput, NotificacionesSmsInput } from './dto/notificaciones.dto';
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

    @Post('email')
    async sendNotificacionCorreo(@Body() data: NotificacionesCorreoInput): Promise<any> {
        return this.notificacionesService.sendNotificacionCorreo(data);
    }

    @Post('sms')
    async sendNotificacionSms(@Body("data") data: NotificacionesSmsInput): Promise<any> {
        return this.notificacionesService.sendNotificacionSms(data);
    }

}