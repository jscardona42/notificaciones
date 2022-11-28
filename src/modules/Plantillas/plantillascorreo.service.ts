import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePlantillaCorreoInput, UpdatePlantillaCorreoInput } from './dto/plantillascorreo.dto';

@Injectable()
export class PlantillasCorreoService {
    constructor(
        private prismaService: PrismaService,
    ) { }

    async getPlantillasCorreo(): Promise<any> {
        return this.prismaService.plantillasCorreo.findMany({
            orderBy: { plantilla_correo_id: "asc" }
        });
    }

    async getPlantillaCorreoById(plantilla_correo_id: number): Promise<any> {
        let plantilla_correo = await this.prismaService.plantillasCorreo.findUnique({
            where: { plantilla_correo_id: plantilla_correo_id }
        })

        if (plantilla_correo === null) {
            throw new UnauthorizedException(`La plantilla con id ${plantilla_correo_id} no existe`);
        }
        return plantilla_correo;
    }

    async createPlantillaCorreo(data: CreatePlantillaCorreoInput): Promise<any> {
        return this.prismaService.plantillasCorreo.create({
            data: {
                nombre: data.nombre,
                codigo: data.codigo,
                asunto: data.asunto,
                cuerpo: data.cuerpo,
                descripcion: data.descripcion
            }
        });
    }

    async updatePlantillaCorreo(data: UpdatePlantillaCorreoInput): Promise<any> {

        await this.getPlantillaCorreoById(data.plantilla_correo_id);

        return this.prismaService.plantillasCorreo.update({
            where: { plantilla_correo_id: data.plantilla_correo_id },
            data: {
                nombre: data.nombre,
                codigo: data.codigo,
                asunto: data.asunto,
                cuerpo: data.cuerpo,
                descripcion: data.descripcion
            }
        });
    }
}
