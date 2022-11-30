import { Test } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { PlantillasPantallaService } from './plantillaspantalla.service';

describe('PlantillasPantalla Service', () => {
    let prismaService: PrismaService;
    let plantillasPantallaService: PlantillasPantallaService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                PlantillasPantallaService,
                {
                    provide: PrismaService,
                    useFactory: () => ({
                        plantillasPantalla: {
                            findFirst: jest.fn(),
                            findMany: jest.fn(),
                            findUnique: jest.fn(),
                            create: jest.fn(),
                            createMany: jest.fn(),
                            update: jest.fn(),
                        },
                    }),
                },
            ],
        }).compile();

        plantillasPantallaService = module.get<PlantillasPantallaService>(PlantillasPantallaService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    describe('getPlantillasPantalla method', () => {
        it('should invoke prismaService.plantillasPantallaService.findMany', async () => {
            await plantillasPantallaService.getPlantillasPantalla();
            expect(prismaService.plantillasPantalla.findMany).toHaveBeenCalled();
        });
    });

    describe('getPlantillaPantallaById method', () => {
        it('should invoke prismaService.plantillasPantallaService.findUnique', async () => {
            const testParams = {
                plantilla_pantalla_id: 1
            };
            await plantillasPantallaService.getPlantillaPantallaById(
                testParams.plantilla_pantalla_id
            );
            expect(prismaService.plantillasPantalla.findUnique).toHaveBeenCalled();
        });
    });

    describe('createPlantillasPantalla method', () => {
        it('should invoke prismaService.plantillasPantallaService.create', async () => {
            const testParams = {
                data: {
                    cuerpo_notificacion: "test",
                    icono: "test",
                    titulo: "test",
                    vinculo: "test",
                }
            };
            await plantillasPantallaService.createPlantillasPantalla(
                testParams.data,
            );
            expect(prismaService.plantillasPantalla.create).toHaveBeenCalled();
        });
    });

    describe('updatePlantillasPantalla method', () => {
        it('should invoke prismaService.plantillasPantallaService.update', async () => {
            const testParams = {
                data: {
                    plantilla_pantalla_id: 1,
                    cuerpo_notificacion: "test",
                    icono: "test",
                    titulo: "test",
                    vinculo: "test",
                }
            };
            await plantillasPantallaService.updatePlantillasPantalla(
                testParams.data
            );
            expect(prismaService.plantillasPantalla.update).toHaveBeenCalled();
        });
    });

})