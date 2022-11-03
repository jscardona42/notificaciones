import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePlantillaInput, UpdatePlantillaInput } from './dto/plantillas.dto';

@Injectable()
export class PlantillasService {
    constructor(
        private prismaService: PrismaService,
    ) { }

    async getPlantillas(): Promise<any> {
        return this.prismaService.plantillas.findMany({
            orderBy: { plantilla_id: "asc" }
        });
    }

    async getPlantillaById(plantilla_id: number): Promise<any> {
        let plantilla = await this.prismaService.plantillas.findUnique({
            where: { plantilla_id: plantilla_id }
        })

        if (plantilla === null) {
            throw new UnauthorizedException(`La plantilla con id ${plantilla_id} no existe`);
        }
        return plantilla;
    }

    async createPlantilla(data: CreatePlantillaInput): Promise<any> {
        return this.prismaService.plantillas.create({
            data: {
                nombre: data.nombre,
                codigo: data.codigo,
                asunto: data.asunto,
                cuerpo: data.cuerpo,
                descripcion: data.descripcion
            }
        });
    }

    async updatePlantilla(data: UpdatePlantillaInput): Promise<any> {

        await this.getPlantillaById(data.plantilla_id);

        return this.prismaService.plantillas.update({
            where: { plantilla_id: data.plantilla_id },
            data: {
                nombre: data.nombre,
                codigo: data.codigo,
                asunto: data.asunto,
                cuerpo: data.cuerpo,
                descripcion: data.descripcion
            }
        });
    }

    async deleteTipoUsuario(plantilla_id: number): Promise<any> {

        await this.getPlantillaById(plantilla_id);

        return this.prismaService.plantillas.delete({
            where: { plantilla_id: plantilla_id }
        });
    }
}
