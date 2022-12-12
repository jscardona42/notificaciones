import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreatePlantillasPantallaInput, UpdatePlantillasPantallaInput } from './dto/plantillaspantalla.dto';
import { PlantillasPantalla } from './entities/plantillaspantalla.entity';
import { PlantillasPantallaService } from './plantillaspantalla.service';

@Resolver(() => PlantillasPantalla)
export class PlantillasPantallaResolver {

    constructor(
        private readonly plantillasPantallaService: PlantillasPantallaService
    ) { }

    @Query(() => [PlantillasPantalla], { description: "Obtener todas las plantillas pantalla" })
    async getPlantillasPantalla(): Promise<any> {
        return this.plantillasPantallaService.getPlantillasPantalla();
    }

    @Query(() => PlantillasPantalla, { description: "Obtener una plantilla pantalla por ID" })
    async getPlantillaPantallaById(@Args("plantilla_pantalla_id") plantilla_pantalla_id: number): Promise<any> {
        return this.plantillasPantallaService.getPlantillaPantallaById(plantilla_pantalla_id);
    }

    @Mutation(() => PlantillasPantalla, { description: "Crear una plantilla pantalla" })
    async createPlantillasPantalla(@Args("data") data: CreatePlantillasPantallaInput): Promise<any> {
        return this.plantillasPantallaService.createPlantillasPantalla(data);
    }

    @Mutation(() => PlantillasPantalla, { description: "Actualizar una plantilla pantalla" })
    async updatePlantillasPantalla(@Args("data") data: UpdatePlantillasPantallaInput): Promise<any> {
        return this.plantillasPantallaService.updatePlantillasPantalla(data);
    }

    @Mutation(() => PlantillasPantalla, { description: "Desactivar una plantilla pantalla" })
    async deletePlantillPantalla(@Args("plantilla_pantalla_id") plantilla_whatsapp_id: number): Promise<any> {
        return this.plantillasPantallaService.deletePlantillPantalla(plantilla_whatsapp_id);
    }

}