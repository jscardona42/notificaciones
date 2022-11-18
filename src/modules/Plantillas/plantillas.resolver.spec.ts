import { Test } from '@nestjs/testing';
import { PlantillasResolver } from './plantillas.resolver';
import { PlantillasService } from './plantillas.service';


describe('Plantillas Resolver', () => {
    let plantillasResolver: PlantillasResolver;
    let plantillasService: PlantillasService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                PlantillasResolver,
                {
                    provide: PlantillasService,
                    useFactory: () => ({
                        getPlantillas: jest.fn(),
                        getPlantillaById: jest.fn(),
                        createPlantilla: jest.fn(),
                        updatePlantilla: jest.fn(),
                        deletePlantilla: jest.fn()
                    }),
                },
            ],
        }).compile();

        plantillasResolver = module.get<PlantillasResolver>(PlantillasResolver);
        plantillasService = module.get<PlantillasService>(PlantillasService);
    });

    describe('Query getPlantillas()', () => {
        it('should invoke plantillasService.getPlantillas()', async () => {
            await plantillasResolver.getPlantillas();
            expect(plantillasService.getPlantillas).toHaveBeenCalled();
        });
    });

    describe('Query getPlantillaById()', () => {
        it('should invoke plantillasService.getPlantillaById', async () => {
            const testParams = {
                plantilla_id: 1
            };
            await plantillasResolver.getPlantillaById(testParams.plantilla_id);
            expect(plantillasService.getPlantillaById).toHaveBeenCalled();
        });
    });

    describe('Mutation createPlantilla()', () => {
        it('should invoke plantillasService.createPlantilla', async () => {
            const testParams = {
                codigo: "codigo",
                nombre: "Icono",
                asunto: "asunto",
                cuerpo: "test",
                descripcion: "test"
            };

            await plantillasResolver.createPlantilla(testParams);
            expect(plantillasService.createPlantilla).toHaveBeenCalledWith(testParams);
        });
    });

    describe('Mutation updatePlantilla()', () => {
        it('should invoke plantillasService.updatePlantilla', async () => {
            const testParams = {
                plantilla_id: 1,
                    codigo: "codigo",
                    nombre: "Icono",
                    asunto: "asunto",
                    cuerpo: "test",
                    descripcion: "test"
            };
            await plantillasResolver.updatePlantilla(testParams);
            expect(plantillasService.updatePlantilla).toHaveBeenCalledWith(testParams);
        });
    });

    describe('Mutation deletePlantilla()', () => {
        it('should invoke plantillasService.deletePlantilla', async () => {
            const testParams = {
                plantilla_id: 1
            };
            await plantillasResolver.deletePlantilla(testParams.plantilla_id);
            expect(plantillasService.deletePlantilla).toHaveBeenCalled();
        });
    });
});