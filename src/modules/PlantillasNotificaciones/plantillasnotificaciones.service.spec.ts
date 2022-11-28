import { Test } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { PlantillasNotificacionesService } from './plantillasnotificaciones.service';

describe('PlantillasNotificaciones Service', () => {
    let prismaService: PrismaService;
    let plantillasNotificacionesService: PlantillasNotificacionesService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                PlantillasNotificacionesService,
                {
                    provide: PrismaService,
                    useFactory: () => ({
                        plantillasNotificaciones: {
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

        plantillasNotificacionesService = module.get<PlantillasNotificacionesService>(PlantillasNotificacionesService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    describe('getPlantillasNotificaciones method', () => {
        it('should invoke prismaService.plantillasNotificacionesService.findMany', async () => {
            await plantillasNotificacionesService.getPlantillasNotificaciones();
            expect(prismaService.plantillasNotificaciones.findMany).toHaveBeenCalled();
        });
    });

    describe('getPlantillaNotificacionById method', () => {
        it('should invoke prismaService.plantillasNotificacionesService.findUnique', async () => {
            const testParams = {
                plantilla_notificacion_id: 1
            };
            await plantillasNotificacionesService.getPlantillaNotificacionById(
                testParams.plantilla_notificacion_id
            );
            expect(prismaService.plantillasNotificaciones.findUnique).toHaveBeenCalled();
        });
    });

    describe('createPlantillasNotificaciones method', () => {
        it('should invoke prismaService.plantillasNotificacionesService.create', async () => {
            const testParams = {
                data: {
                    cuerpo_notificacion: "test",
                    icono: "test",
                    titulo: "test",
                    vinculo: "test",
                }
            };
            await plantillasNotificacionesService.createPlantillasNotificaciones(
                testParams.data,
            );
            expect(prismaService.plantillasNotificaciones.create).toHaveBeenCalled();
        });
    });

    describe('updatePlantillasNotificaciones method', () => {
        it('should invoke prismaService.plantillasNotificacionesService.update', async () => {
            const testParams = {
                data: {
                    plantilla_notificacion_id: 1,
                    cuerpo_notificacion: "test",
                    icono: "test",
                    titulo: "test",
                    vinculo: "test",
                }
            };
            await plantillasNotificacionesService.updatePlantillasNotificaciones(
                testParams.data
            );
            expect(prismaService.plantillasNotificaciones.update).toHaveBeenCalled();
        });
    });

})