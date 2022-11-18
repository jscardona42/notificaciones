import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProveedoresMensajeriaService } from './proveedoresmensajeria.service';

@Controller('notificaciones')
export class ProveedoresMensajeriaController {
    constructor(
        private readonly proveedoresMensajeriaService: ProveedoresMensajeriaService
    ) { }

    @Post()
    async saveEventos(@Body() data: any) {
        return this.proveedoresMensajeriaService.saveEventos(data);
    }

}