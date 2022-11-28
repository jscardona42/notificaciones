import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { PlantillasNotificacionesService } from '../PlantillasNotificaciones/plantillasnotificaciones.service';
import { CreateNotificacionesInput, UpdateNotificacionesInput } from './dto/notificaciones.dto';

@Injectable()
export class NotificacionesService {
    
    constructor(
        private prismaService: PrismaService,
        private plantillasNotificacionesService: PlantillasNotificacionesService
    ) { }

    async getNotificaciones(): Promise<any> {
        return this.prismaService.notificaciones.findMany({
            orderBy: { notificacion_id: "asc" }
        });
    }

    async getNotificacionById(notificacion_id: number): Promise<any> {
        let notificacion = await this.prismaService.notificaciones.findUnique({
            where: { notificacion_id: notificacion_id }
        })

        if (notificacion === null) {
            throw new UnauthorizedException(`La notificacion con id ${notificacion_id} no existe`);
        }
        return notificacion;
    }

    async createNotificaciones(data: CreateNotificacionesInput): Promise<any> {

        await this.plantillasNotificacionesService.getPlantillaNotificacionById(data.plantilla_notificacion_id)

        return this.prismaService.notificaciones.create({
            data: {
                fecha_generacion: new Date(),
                fecha_leido: null,
                usuario_destino: data.usuario_destino,
                plantilla_notificacion_id: data.plantilla_notificacion_id
            }
        });
    }

    async updateNotificaciones(data: UpdateNotificacionesInput): Promise<any> {
        
        await this.plantillasNotificacionesService.getPlantillaNotificacionById(data.plantilla_notificacion_id)
        
        await this.getNotificacionById(data.notificacion_id);

        return this.prismaService.notificaciones.update({
            where: { notificacion_id: data.notificacion_id },
            data: {
                ...data
            }
        });
    }

    async getNotificacionesByUserId(usuario_destino: number){

        return this.prismaService.notificaciones.findMany({
            where:{ usuario_destino: usuario_destino },
            orderBy: { notificacion_id: "asc" }
        })
    }

    async checkNotificaciones(usuario_destino: number){

        return this.prismaService.notificaciones.updateMany({
            where:{ usuario_destino: usuario_destino },
            data:{
                leido: true
            }
        })
    }
}
