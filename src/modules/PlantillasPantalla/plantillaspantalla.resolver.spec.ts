import { Test } from '@nestjs/testing';
import { PlantillasPantallaResolver } from './plantillaspantalla.resolver';
import { PlantillasPantallaService } from './plantillaspantalla.service';

describe('PlantillasPantalla Resolver', () => {
    let plantillasPantallaResolver: PlantillasPantallaResolver;
    let plantillasPantallaService: PlantillasPantallaService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                PlantillasPantallaResolver,
                {
                    provide: PlantillasPantallaService,
                    useFactory: () => ({
                        getPlantillasPantalla: jest.fn(),
                        getPlantillaPantallaById: jest.fn(),
                        createPlantillasPantalla: jest.fn(),
                        updatePlantillasPantalla: jest.fn(),
                    }),
                },
            ],
        }).compile();

        plantillasPantallaResolver = module.get<PlantillasPantallaResolver>(PlantillasPantallaResolver);
        plantillasPantallaService = module.get<PlantillasPantallaService>(PlantillasPantallaService);
    });

    describe('Query getPlantillasPantalla()', () => {
        it('should invoke plantillasPantallaService.getPlantillasPantalla()', async () => {
            await plantillasPantallaResolver.getPlantillasPantalla();
            expect(plantillasPantallaService.getPlantillasPantalla).toHaveBeenCalled();
        });
    });

    describe('Query getPlantillaPantallaById()', () => {
        it('should invoke plantillasPantallaService.getPlantillaPantallaById', async () => {
            const testParams = {
                plantilla_pantalla_id: 1
            };
            await plantillasPantallaResolver.getPlantillaPantallaById(testParams.plantilla_pantalla_id);
            expect(plantillasPantallaService.getPlantillaPantallaById).toHaveBeenCalled();
        });
    });

    describe('Mutation createPlantillasPantalla()', () => {
        it('should invoke plantillasPantallaService.createPlantillasPantalla', async () => {
            const testParams = {
                data: {
                    cuerpo_notificacion: "test",
                    icono: "test",
                    titulo: "test",
                    vinculo: "test",
                }
            };

            await plantillasPantallaResolver.createPlantillasPantalla(testParams.data);
            expect(plantillasPantallaService.createPlantillasPantalla).toHaveBeenCalledWith(testParams.data);
        });
    });

    describe('Mutation updatePlantillasPantalla()', () => {
        it('should invoke plantillasPantallaService.updatePlantillasPantalla', async () => {
            const testParams = {
                data: {
                    plantilla_pantalla_id: 1,
                    cuerpo_notificacion: "test",
                    icono: "test",
                    titulo: "test",
                    vinculo: "test",
                }
            };
            await plantillasPantallaResolver.updatePlantillasPantalla(testParams.data);
            expect(plantillasPantallaService.updatePlantillasPantalla).toHaveBeenCalledWith(testParams.data);
        });
    });
});