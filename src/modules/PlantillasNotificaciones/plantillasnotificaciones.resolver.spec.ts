import { Test } from '@nestjs/testing';
import { PlantillasNotificacionesResolver } from './plantillasnotificaciones.resolver';
import { PlantillasNotificacionesService } from './plantillasnotificaciones.service';

describe('Notificaciones Resolver', () => {
    let plantitllasNotificacionesResolver: PlantillasNotificacionesResolver;
    let plantillasNotificacionesService: PlantillasNotificacionesService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                PlantillasNotificacionesResolver,
                {
                    provide: PlantillasNotificacionesService,
                    useFactory: () => ({
                        getPlantillasNotificaciones: jest.fn(),
                        getPlantillaNotificacionById: jest.fn(),
                        createPlantillasNotificaciones: jest.fn(),
                        updatePlantillasNotificaciones: jest.fn(),
                    }),
                },
            ],
        }).compile();

        plantitllasNotificacionesResolver = module.get<PlantillasNotificacionesResolver>(PlantillasNotificacionesResolver);
        plantillasNotificacionesService = module.get<PlantillasNotificacionesService>(PlantillasNotificacionesService);
    });

    describe('Query getPlantillasNotificaciones()', () => {
        it('should invoke plantillasNotificacionesService.getPlantillasNotificaciones()', async () => {
            await plantitllasNotificacionesResolver.getPlantillasNotificaciones();
            expect(plantillasNotificacionesService.getPlantillasNotificaciones).toHaveBeenCalled();
        });
    });

    describe('Query getPlantillaNotificacionById()', () => {
        it('should invoke plantillasNotificacionesService.getPlantillaNotificacionById', async () => {
            const testParams = {
                plantilla_notificacion_id: 1
            };
            await plantitllasNotificacionesResolver.getPlantillaNotificacionById(testParams.plantilla_notificacion_id);
            expect(plantillasNotificacionesService.getPlantillaNotificacionById).toHaveBeenCalled();
        });
    });

    describe('Mutation createPlantillasNotificaciones()', () => {
        it('should invoke plantillasNotificacionesService.createPlantillasNotificaciones', async () => {
            const testParams = {
                data: {
                    cuerpo_notificacion: "test",
                    icono: "test",
                    titulo: "test",
                    vinculo: "test",
                }
            };

            await plantitllasNotificacionesResolver.createPlantillasNotificaciones(testParams.data);
            expect(plantillasNotificacionesService.createPlantillasNotificaciones).toHaveBeenCalledWith(testParams.data);
        });
    });

    describe('Mutation updatePlantillasNotificaciones()', () => {
        it('should invoke plantillasNotificacionesService.updatePlantillasNotificaciones', async () => {
            const testParams = {
                data: {
                    plantilla_notificacion_id: 1,
                    cuerpo_notificacion: "test",
                    icono: "test",
                    titulo: "test",
                    vinculo: "test",
                }
            };
            await plantitllasNotificacionesResolver.updatePlantillasNotificaciones(testParams.data);
            expect(plantillasNotificacionesService.updatePlantillasNotificaciones).toHaveBeenCalledWith(testParams.data);
        });
    });
});