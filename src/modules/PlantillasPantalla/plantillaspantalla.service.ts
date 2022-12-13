import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePlantillasPantallaInput, UpdatePlantillasPantallaInput } from './dto/plantillaspantalla.dto';

@Injectable()
export class PlantillasPantallaService {
    constructor(
        private prismaService: PrismaService,
    ) { }

    async getPlantillasPantalla(): Promise<any> {
        return this.prismaService.plantillasPantalla.findMany({
            orderBy: { plantilla_pantalla_id: "asc" }
        });
    }

    async getPlantillaPantallaById(plantilla_pantalla_id: number): Promise<any> {
        let plantilla_pantalla = await this.prismaService.plantillasPantalla.findUnique({
            where: { plantilla_pantalla_id: plantilla_pantalla_id }
        })

        if (plantilla_pantalla === null) {
            throw new UnauthorizedException(`La plantilla pantalla con id ${plantilla_pantalla_id} no existe`);
        }
        return plantilla_pantalla;
    }

    async createPlantillasPantalla(data: CreatePlantillasPantallaInput): Promise<any> {
        return this.prismaService.plantillasPantalla.create({
            data: {
                ...data
            }
        });
    }

    async updatePlantillasPantalla(data: UpdatePlantillasPantallaInput): Promise<any> {

        await this.getPlantillaPantallaById(data.plantilla_pantalla_id);

        return this.prismaService.plantillasPantalla.update({
            where: { plantilla_pantalla_id: data.plantilla_pantalla_id },
            data: {
                ...data
            }
        });
    }

    async deletePlantillPantalla(plantilla_pantalla_id: number): Promise<any> {
        await this.getPlantillaPantallaById(plantilla_pantalla_id);

        return this.prismaService.plantillasPantalla.update({
            where: { plantilla_pantalla_id: plantilla_pantalla_id },
            data: { estado: false }
        })
    }
}
