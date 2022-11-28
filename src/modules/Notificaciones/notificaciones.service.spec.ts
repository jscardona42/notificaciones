import { Test } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { PlantillasNotificacionesService } from '../PlantillasNotificaciones/plantillasnotificaciones.service';
import { NotificacionesService } from './notificaciones.service';

describe('Notificaciones Service', () => {
    let prismaService: PrismaService;
    let notificacionesService: NotificacionesService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                NotificacionesService, PlantillasNotificacionesService,
                {
                    provide: PrismaService,
                    useFactory: () => ({
                        notificaciones: {
                            findFirst: jest.fn(),
                            findMany: jest.fn(),
                            findUnique: jest.fn(),
                            create: jest.fn(),
                            createMany: jest.fn(),
                            update: jest.fn(),
                        },
                        plantillasNotificaciones:{
                            findUnique: jest.fn(),
                        }
                    }),
                },
            ],
        }).compile();

        notificacionesService = module.get<NotificacionesService>(NotificacionesService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    describe('getNotificaciones method', () => {
        it('should invoke prismaService.notificacionesService.findMany', async () => {
            await notificacionesService.getNotificaciones();
            expect(prismaService.notificaciones.findMany).toHaveBeenCalled();
        });
    });

    describe('getNotificacionById method', () => {
        it('should invoke prismaService.notificacionesService.findUnique', async () => {
            const testParams = {
                notificacion_id: 1
            };
            await notificacionesService.getNotificacionById(
                testParams.notificacion_id
            );
            expect(prismaService.notificaciones.findUnique).toHaveBeenCalled();
        });
    });

    describe('createNotificaciones method', () => {
        it('should invoke prismaService.notificacionesService.create', async () => {
            const testParams = {
                data: {
                    usuario_destino: 106,
                    plantilla_notificacion_id: 2
                }
            };
            await notificacionesService.createNotificaciones(
                testParams.data,
            );
            expect(prismaService.notificaciones.create).toHaveBeenCalled();
        });
    });

    describe('updateNotificaciones method', () => {
        it('should invoke prismaService.notificacionesService.update', async () => {
            const testParams = {
                data: {
                    notificacion_id: 1,
                    plantilla_notificacion_id: 3
                }
            };
            await notificacionesService.updateNotificaciones(
                testParams.data
            );
            expect(prismaService.notificaciones.update).toHaveBeenCalled();
        });
    });

})