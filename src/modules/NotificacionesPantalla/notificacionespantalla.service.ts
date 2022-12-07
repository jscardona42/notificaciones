import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { PlantillasPantallaService } from '../PlantillasPantalla/plantillaspantalla.service';
import { CreateNotificacionesPantallaArrayInput, CreateNotificacionesPantallaInput, UpdateNotificacionesPantallaInput } from './dto/notificacionespantalla.dto';

@Injectable()
export class NotificacionesPantallaService {

    constructor(
        private prismaService: PrismaService,
        private plantillasPantallaService: PlantillasPantallaService
    ) { }

    async getNotificacionesPantalla(): Promise<any> {
        return this.prismaService.notificacionesPantalla.findMany({
            orderBy: { notificacion_pantalla_id: "asc" }
        });
    }

    async getNotificacionPantallaById(notificacion_pantalla_id: number): Promise<any> {
        let notificacion = await this.prismaService.notificacionesPantalla.findUnique({
            where: { notificacion_pantalla_id: notificacion_pantalla_id }
        })

        if (notificacion === null) {
            throw new UnauthorizedException(`La notificación pantalla con id ${notificacion_pantalla_id} no existe`);
        }
        return notificacion;
    }

    async createNotificacionPantalla(data: CreateNotificacionesPantallaArrayInput): Promise<any> {
        let createNotificacionPantalla = [];

        await data.data.reduce(async (promise0, notpan) => {
            await promise0;

            await this.plantillasPantallaService.getPlantillaPantallaById(notpan.plantilla_pantalla_id);

            createNotificacionPantalla.push({
                fecha_generacion: new Date(),
                usuario_destino: notpan.usuario_destino,
                plantilla_pantalla_id: notpan.plantilla_pantalla_id
            });
        }, Promise.resolve());

        return this.prismaService.notificacionesPantalla.createMany({
            data: createNotificacionPantalla
        });
    }

    async updateNotificacionPantalla(data: UpdateNotificacionesPantallaInput): Promise<any> {

        await this.plantillasPantallaService.getPlantillaPantallaById(data.plantilla_pantalla_id)

        await this.getNotificacionPantallaById(data.notificacion_pantalla_id);

        return this.prismaService.notificacionesPantalla.update({
            where: { notificacion_pantalla_id: data.notificacion_pantalla_id },
            data: {
                ...data
            }
        });
    }

    async getNotificacionesPantallaByUserId(usuario_destino: number) {

        return this.prismaService.notificacionesPantalla.findMany({
            where: { usuario_destino: usuario_destino },
            orderBy: { notificacion_pantalla_id: "asc" },
            include: { PlantillasPantalla: true }
        });
    }

    async checkNotificacionesPantallaVisto(usuario_destino: number) {

        let notificaciones = await this.getNotificacionesPantallaByUserId(usuario_destino);

        if (notificaciones.length == 0) {
            return [];
        }

        let count = await this.prismaService.notificacionesPantalla.updateMany({
            where: { usuario_destino: usuario_destino, visto: false },
            data: {
                visto: true
            },
        });

        return this.prismaService.notificacionesPantalla.findMany({
            orderBy: { notificacion_pantalla_id: "desc" },
            take: count.count
        });
    }

    async checkNotificacionesPantallaLeido(notificacion_pantalla_id: number) {

        await this.getNotificacionPantallaById(notificacion_pantalla_id);

        return this.prismaService.notificacionesPantalla.update({
            where: { notificacion_pantalla_id: notificacion_pantalla_id },
            data: {
                leido: true,
                fecha_leido: new Date()
            },
        });
    }
}
