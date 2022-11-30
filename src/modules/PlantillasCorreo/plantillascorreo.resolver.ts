import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreatePlantillaCorreoInput, UpdatePlantillaCorreoInput } from './dto/plantillascorreo.dto';
import { PlantillasCorreo } from './entities/plantillascorreo.entity';
import { PlantillasCorreoService } from './plantillascorreo.service';

@Resolver(() => PlantillasCorreo)
export class PlantillasCorreoResolver {

    constructor(
        private readonly plantillasService: PlantillasCorreoService
    ) { }

    @Query(() => [PlantillasCorreo], { description: "Obtener todas las pantillas de correo" })
    async getPlantillasCorreo(): Promise<any> {
        return this.plantillasService.getPlantillasCorreo();
    }

    @Query(() => PlantillasCorreo, { description: "Obtener una plantilla de correo por ID" })
    async getPlantillaCorreoById(@Args("plantilla_correo_id") plantilla_correo_id: number): Promise<any> {
        return this.plantillasService.getPlantillaCorreoById(plantilla_correo_id);
    }

    @Mutation(() => PlantillasCorreo, { description: "Crear una pantilla de correo" })
    async createPlantillaCorreo(@Args("data") data: CreatePlantillaCorreoInput): Promise<any> {
        return this.plantillasService.createPlantillaCorreo(data);
    }

    @Mutation(() => PlantillasCorreo, { description: "Actualizar una pantilla de correo" })
    async updatePlantillaCorreo(@Args("data") data: UpdatePlantillaCorreoInput): Promise<any> {
        return this.plantillasService.updatePlantillaCorreo(data);
    }
}