import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePlantillasNotificacionesInput, UpdatePlantillasNotificacionesInput } from './dto/plantillasnotificaciones.dto';

@Injectable()
export class PlantillasNotificacionesService {
    constructor(
        private prismaService: PrismaService,
    ) { }

    async getPlantillasNotificaciones(): Promise<any> {
        return this.prismaService.plantillasNotificaciones.findMany({
            orderBy: { plantilla_notificacion_id: "asc" }
        });
    }

    async getPlantillaNotificacionById(plantilla_notificacion_id: number): Promise<any> {
        let plantilla_notificacion = await this.prismaService.plantillasNotificaciones.findUnique({
            where: { plantilla_notificacion_id: plantilla_notificacion_id }
        })

        if (plantilla_notificacion === null) {
            throw new UnauthorizedException(`La notificacion con id ${plantilla_notificacion_id} no existe`);
        }
        return plantilla_notificacion;
    }

    async createPlantillasNotificaciones(data: CreatePlantillasNotificacionesInput): Promise<any> {
        return this.prismaService.plantillasNotificaciones.create({
            data: {
                ...data
            }
        });
    }

    async updatePlantillasNotificaciones(data: UpdatePlantillasNotificacionesInput): Promise<any> {

        await this.getPlantillaNotificacionById(data.plantilla_notificacion_id);

        return this.prismaService.plantillasNotificaciones.update({
            where: { plantilla_notificacion_id: data.plantilla_notificacion_id },
            data: {
                ...data
            }
        });
    }
}
