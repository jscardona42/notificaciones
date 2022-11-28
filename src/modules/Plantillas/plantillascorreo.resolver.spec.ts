import { Test } from '@nestjs/testing';
import { PlantillasCorreoResolver } from './plantillascorreo.resolver';
import { PlantillasCorreoService } from './plantillascorreo.service';


describe('Plantillas Resolver', () => {
    let plantillasCorreoResolver: PlantillasCorreoResolver;
    let plantillasCorreoService: PlantillasCorreoService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                PlantillasCorreoResolver,
                {
                    provide: PlantillasCorreoService,
                    useFactory: () => ({
                        getPlantillasCorreo: jest.fn(),
                        getPlantillaCorreoById: jest.fn(),
                        createPlantillaCorreo: jest.fn(),
                        updatePlantillaCorreo: jest.fn(),
                    }),
                },
            ],
        }).compile();

        plantillasCorreoResolver = module.get<PlantillasCorreoResolver>(PlantillasCorreoResolver);
        plantillasCorreoService = module.get<PlantillasCorreoService>(PlantillasCorreoService);
    });

    describe('Query getPlantillasCorreo()', () => {
        it('should invoke plantillasCorreoService.getPlantillasCorreo()', async () => {
            await plantillasCorreoResolver.getPlantillasCorreo();
            expect(plantillasCorreoService.getPlantillasCorreo).toHaveBeenCalled();
        });
    });

    describe('Query getPlantillaCorreoById()', () => {
        it('should invoke plantillasCorreoService.getPlantillaCorreoById', async () => {
            const testParams = {
                plantilla_correo_id: 1
            };
            await plantillasCorreoResolver.getPlantillaCorreoById(testParams.plantilla_correo_id);
            expect(plantillasCorreoService.getPlantillaCorreoById).toHaveBeenCalled();
        });
    });

    describe('Mutation createPlantillaCorreo()', () => {
        it('should invoke plantillasCorreoService.createPlantillaCorreo', async () => {
            const testParams = {
                codigo: "codigo",
                nombre: "Icono",
                asunto: "asunto",
                cuerpo: "test",
                descripcion: "test"
            };

            await plantillasCorreoResolver.createPlantillaCorreo(testParams);
            expect(plantillasCorreoService.createPlantillaCorreo).toHaveBeenCalledWith(testParams);
        });
    });

    describe('Mutation updatePlantilla()', () => {
        it('should invoke plantillasCorreoService.updatePlantilla', async () => {
            const testParams = {
                plantilla_correo_id: 1,
                codigo: "codigo",
                nombre: "Icono",
                asunto: "asunto",
                cuerpo: "test",
                descripcion: "test"
            };
            await plantillasCorreoResolver.updatePlantillaCorreo(testParams);
            expect(plantillasCorreoService.updatePlantillaCorreo).toHaveBeenCalledWith(testParams);
        });
    });
});