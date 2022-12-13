import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreatePlantillasWhatsappInput, UpdatePlantillasWhatsappInput } from './dto/plantillaswhatsapp.dto';
import { PlantillasWhatsapp } from './entities/plantillaswhatsapp.entity';
import { PlantillasWhatsappService } from './plantillaswhatsapp.service';

@Resolver(() => PlantillasWhatsapp)
export class PlantillasWhatsappResolver {

    constructor(
        private readonly plantillasWhatsappService: PlantillasWhatsappService
    ) { }

    @Query(() => [PlantillasWhatsapp], { description: "Obtener todas las plantillas de whatsapp" })
    async getPlantillasWhatsapp(): Promise<any> {
        return this.plantillasWhatsappService.getPlantillasWhatsapp();
    }

    @Query(() => PlantillasWhatsapp, { description: "Obtener una plantilla de whatsapp por ID" })
    async getPlantillaWhatsappById(@Args("plantilla_whatsapp_id") plantilla_whatsapp_id: number): Promise<any> {
        return this.plantillasWhatsappService.getPlantillaWhatsappById(plantilla_whatsapp_id);
    }

    @Mutation(() => PlantillasWhatsapp, { description: "Crear una plantilla de whatsapp" })
    async createPlantillaWhatsapp(@Args("data") data: CreatePlantillasWhatsappInput): Promise<any> {
        return this.plantillasWhatsappService.createPlantillaWhatsapp(data);
    }

    @Mutation(() => PlantillasWhatsapp, { description: "Actualizar una plantilla de whatsapp" })
    async updatePlantillaWhatsapp(@Args("data") data: UpdatePlantillasWhatsappInput): Promise<any> {
        return this.plantillasWhatsappService.updatePlantillaWhatsapp(data);
    }

    @Mutation(() => PlantillasWhatsapp, { description: "Desactivar una plantilla de whatsapp" })
    async deletePlantillaWhatsapp(@Args("plantilla_whatsapp_id") plantilla_whatsapp_id: number): Promise<any> {
        return this.plantillasWhatsappService.deletePlantillaWhatsapp(plantilla_whatsapp_id);
    }

}