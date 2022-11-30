import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreatePlantillasPantallaInput, UpdatePlantillasPantallaInput } from './dto/plantillaspantalla.dto';
import { PlantillasPantalla } from './entities/plantillaspantalla.entity';
import { PlantillasPantallaService } from './plantillaspantalla.service';

@Resolver(() => PlantillasPantalla)
export class PlantillasPantallaResolver {

    constructor(
        private readonly plantillasPantallaService: PlantillasPantallaService
    ) { }

    @Query(() => [PlantillasPantalla])
    async getPlantillasPantalla(): Promise<any> {
        return this.plantillasPantallaService.getPlantillasPantalla();
    }

    @Query(() => PlantillasPantalla)
    async getPlantillaPantallaById(@Args("plantilla_pantalla_id") plantilla_pantalla_id: number): Promise<any> {
        return this.plantillasPantallaService.getPlantillaPantallaById(plantilla_pantalla_id);
    }

    @Mutation(() => PlantillasPantalla)
    async createPlantillasPantalla(@Args("data") data: CreatePlantillasPantallaInput): Promise<any> {
        return this.plantillasPantallaService.createPlantillasPantalla(data);
    }

    @Mutation(() => PlantillasPantalla)
    async updatePlantillasPantalla(@Args("data") data: UpdatePlantillasPantallaInput): Promise<any> {
        return this.plantillasPantallaService.updatePlantillasPantalla(data);
    }

}