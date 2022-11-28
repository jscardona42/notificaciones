import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreatePlantillaCorreoInput, UpdatePlantillaCorreoInput } from './dto/plantillascorreo.dto';
import { PlantillasCorreo } from './entities/plantillascorreo.entity';
import { PlantillasCorreoService } from './plantillascorreo.service';

@Resolver(() => PlantillasCorreo)
export class PlantillasCorreoResolver {

    constructor(
        private readonly plantillasService: PlantillasCorreoService
    ) { }

    @Query(() => [PlantillasCorreo])
    async getPlantillasCorreo(): Promise<any> {
        return this.plantillasService.getPlantillasCorreo();
    }

    @Query(() => PlantillasCorreo)
    async getPlantillaCorreoById(@Args("plantilla_correo_id") plantilla_correo_id: number): Promise<any> {
        return this.plantillasService.getPlantillaCorreoById(plantilla_correo_id);
    }

    @Mutation(() => PlantillasCorreo)
    async createPlantillaCorreo(@Args("data") data: CreatePlantillaCorreoInput): Promise<any> {
        return this.plantillasService.createPlantillaCorreo(data);
    }

    @Mutation(() => PlantillasCorreo)
    async updatePlantillaCorreo(@Args("data") data: UpdatePlantillaCorreoInput): Promise<any> {
        return this.plantillasService.updatePlantillaCorreo(data);
    }
}