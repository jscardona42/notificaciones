import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePlantillasWhatsappInput, UpdatePlantillasWhatsappInput } from './dto/plantillaswhatsapp.dto';

@Injectable()
export class PlantillasWhatsappService {
    constructor(
        private prismaService: PrismaService,
    ) { }

    async getPlantillasWhatsapp(): Promise<any> {
        return this.prismaService.plantillasWhatsapp.findMany({
            orderBy: { plantilla_whatsapp_id: "asc" }
        });
    }

    async getPlantillaWhatsappById(plantilla_whatsapp_id: number): Promise<any> {
        let plantilla_pantalla = await this.prismaService.plantillasWhatsapp.findUnique({
            where: { plantilla_whatsapp_id: plantilla_whatsapp_id }
        })

        if (plantilla_pantalla === null) {
            throw new UnauthorizedException(`La plantilla whatsapp con id ${plantilla_whatsapp_id} no existe`);
        }
        return plantilla_pantalla;
    }

    async createPlantillaWhatsapp(data: CreatePlantillasWhatsappInput): Promise<any> {
        return this.prismaService.plantillasWhatsapp.create({
            data: {
                ...data
            }
        });
    }

    async updatePlantillaWhatsapp(data: UpdatePlantillasWhatsappInput): Promise<any> {

        await this.getPlantillaWhatsappById(data.plantilla_whatsapp_id);

        return this.prismaService.plantillasWhatsapp.update({
            where: { plantilla_whatsapp_id: data.plantilla_whatsapp_id },
            data: {
                ...data
            }
        });
    }

    async deletePlantillaWhatsapp(plantilla_whatsapp_id: number): Promise<any> {
        await this.getPlantillaWhatsappById(plantilla_whatsapp_id);

        return this.prismaService.plantillasWhatsapp.update({
            where: { plantilla_whatsapp_id: plantilla_whatsapp_id },
            data: { estado: false }
        })
    }

    async getPlantillaWhatsappByTitulo(titulo: string): Promise<any> {
        return this.prismaService.plantillasWhatsapp.findFirst({
            where: { titulo: titulo }
        })
    }
}
