import { Test } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { PlantillasService } from './plantillas.service';

describe('Plantillas Service', () => {
    let prismaService: PrismaService;
    let plantillasService: PlantillasService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                PlantillasService,
                {
                    provide: PrismaService,
                    useFactory: () => ({
                        plantillas: {
                            findFirst: jest.fn(),
                            findMany: jest.fn(),
                            findUnique: jest.fn(),
                            create: jest.fn(),
                            createMany: jest.fn(),
                            update: jest.fn(),
                            delete: jest.fn(),
                        },
                    }),
                },
            ],
        }).compile();

        plantillasService = module.get<PlantillasService>(PlantillasService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    describe('getPlantillas method', () => {
        it('should invoke prismaService.plantillasService.findMany', async () => {
            await plantillasService.getPlantillas();
            expect(prismaService.plantillas.findMany).toHaveBeenCalled();
        });
    });

    describe('getPlantillaById method', () => {
        it('should invoke prismaService.plantillasService.findUnique', async () => {
            const testParams = {
                plantilla_id: 1
            };
            await plantillasService.getPlantillaById(
                testParams.plantilla_id
            );
            expect(prismaService.plantillas.findUnique).toHaveBeenCalled();
        });
    });

    describe('createPlantilla method', () => {
        it('should invoke prismaService.plantillasService.create', async () => {
            const testParams = {
                data: {
                    codigo: "codigo",
                    nombre: "Icono",
                    asunto: "asunto",
                    cuerpo: "test",
                    descripcion: "test"
                }
            };
            await plantillasService.createPlantilla(
                testParams.data,
            );
            expect(prismaService.plantillas.create).toHaveBeenCalled();
        });
    });

    describe('updatePlantilla method', () => {
        it('should invoke prismaService.plantillasService.update', async () => {
            const testParams = {
                data: {
                    plantilla_id: 1,
                    codigo: "codigo",
                    nombre: "Icono",
                    asunto: "asunto",
                    cuerpo: "test",
                    descripcion: "test"
                }
            };
            await plantillasService.updatePlantilla(
                testParams.data
            );
            expect(prismaService.plantillas.update).toHaveBeenCalled();
        });
    });

    describe('deletePlantilla method', () => {
        it('should invoke prismaService.plantillasService.update', async () => {
            const testParams = {
                plantilla_id: 1
            };
            await plantillasService.deletePlantilla(
                testParams.plantilla_id
            );
            expect(prismaService.plantillas.delete).toHaveBeenCalled();
        });
    });

})