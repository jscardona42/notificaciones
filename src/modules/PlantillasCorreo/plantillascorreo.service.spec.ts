import { Test } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { PlantillasCorreoService } from './plantillascorreo.service';

describe('Plantillas Service', () => {
    let prismaService: PrismaService;
    let plantillasCorreoService: PlantillasCorreoService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                PlantillasCorreoService,
                {
                    provide: PrismaService,
                    useFactory: () => ({
                        plantillasCorreo: {
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

        plantillasCorreoService = module.get<PlantillasCorreoService>(PlantillasCorreoService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    describe('getPlantillasCorreo method', () => {
        it('should invoke prismaService.plantillasCorreoService.findMany', async () => {
            await plantillasCorreoService.getPlantillasCorreo();
            expect(prismaService.plantillasCorreo.findMany).toHaveBeenCalled();
        });
    });

    describe('getPlantillaCorreoById method', () => {
        it('should invoke prismaService.plantillasCorreoService.findUnique', async () => {
            const testParams = {
                plantilla_correo_id: 1
            };
            await plantillasCorreoService.getPlantillaCorreoById(
                testParams.plantilla_correo_id
            );
            expect(prismaService.plantillasCorreo.findUnique).toHaveBeenCalled();
        });
    });

    describe('createPlantillaCorreo method', () => {
        it('should invoke prismaService.plantillasCorreoService.create', async () => {
            const testParams = {
                data: {
                    codigo: "codigo",
                    nombre: "Icono",
                    asunto: "asunto",
                    cuerpo: "test",
                    descripcion: "test"
                }
            };
            await plantillasCorreoService.createPlantillaCorreo(
                testParams.data,
            );
            expect(prismaService.plantillasCorreo.create).toHaveBeenCalled();
        });
    });

    describe('updatePlantillaCorreo method', () => {
        it('should invoke prismaService.plantillasCorreoService.update', async () => {
            const testParams = {
                data: {
                    plantilla_correo_id: 1,
                    codigo: "codigo",
                    nombre: "Icono",
                    asunto: "asunto",
                    cuerpo: "test",
                    descripcion: "test"
                }
            };
            await plantillasCorreoService.updatePlantillaCorreo(
                testParams.data
            );
            expect(prismaService.plantillasCorreo.update).toHaveBeenCalled();
        });
    });

})