import { Controller, Post, Body } from '@nestjs/common';
import { ProveedoresMensajeriaService } from './proveedoresmensajeria.service';

@Controller('notificaciones')
export class ProveedoresMensajeriaController {
    constructor(
        private readonly proveedoresMensajeriaService: ProveedoresMensajeriaService
    ) { }

    @Post()
    async saveEventos(@Body() data: any) {
        console.log(data)
        return this.proveedoresMensajeriaService.saveEventos();
    }

}