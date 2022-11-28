import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreatePlantillasNotificacionesInput, UpdatePlantillasNotificacionesInput } from './dto/plantillasnotificaciones.dto';
import { PlantillasNotificaciones } from './entities/plantillasnotificaciones.entity';
import { PlantillasNotificacionesService } from './plantillasnotificaciones.service';

@Resolver(() => PlantillasNotificaciones)
export class PlantillasNotificacionesResolver {

    constructor(
        private readonly plantillasNotificacionesService: PlantillasNotificacionesService
    ) { }

    @Query(() => [PlantillasNotificaciones])
    async getPlantillasNotificaciones(): Promise<any> {
        return this.plantillasNotificacionesService.getPlantillasNotificaciones();
    }

    @Query(() => PlantillasNotificaciones)
    async getPlantillaNotificacionById(@Args("plantilla_notificacion_id") plantilla_notificacion_id: number): Promise<any> {
        return this.plantillasNotificacionesService.getPlantillaNotificacionById(plantilla_notificacion_id);
    }

    @Mutation(() => PlantillasNotificaciones)
    async createPlantillasNotificaciones(@Args("data") data: CreatePlantillasNotificacionesInput): Promise<any> {
        return this.plantillasNotificacionesService.createPlantillasNotificaciones(data);
    }

    @Mutation(() => PlantillasNotificaciones)
    async updatePlantillasNotificaciones(@Args("data") data: UpdatePlantillasNotificacionesInput): Promise<any> {
        return this.plantillasNotificacionesService.updatePlantillasNotificaciones(data);
    }

}