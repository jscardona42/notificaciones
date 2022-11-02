import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreatePlantillaInput, UpdatePlantillaInput } from './dto/plantillas.dto';
import { Plantillas } from './entities/plantillas.entity';
import { PlantillasService } from './plantillas.service';

@Resolver(() => Plantillas)
export class PlantillasResolver {

    constructor(
        private readonly plantillasService: PlantillasService
    ) { }

    @Query(() => [Plantillas])
    async getPlantillas(): Promise<any> {
        return this.plantillasService.getPlantillas();
    }

    @Query(() => Plantillas)
    async getPlantillaById(@Args("plantilla_id") plantilla_id: number): Promise<any> {
        return this.plantillasService.getPlantillaById(plantilla_id);
    }

    @Mutation(() => Plantillas)
    async createPlantilla(@Args("data") data: CreatePlantillaInput): Promise<any> {
        return this.plantillasService.createPlantilla(data);
    }

    @Mutation(() => Plantillas)
    async updatePlantilla(@Args("data") data: UpdatePlantillaInput): Promise<any> {
        return this.plantillasService.updatePlantilla(data);
    }

    @Mutation(() => Plantillas)
    async deleteTipoUsuario(@Args("plantilla_id") plantilla_id: number): Promise<any> {
        return this.plantillasService.deleteTipoUsuario(plantilla_id);
    }
}