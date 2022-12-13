import { Test } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { CreatePlantillasPantallaInput } from '../PlantillasPantalla/dto/plantillaspantalla.dto';
import { PlantillasPantallaService } from '../PlantillasPantalla/plantillaspantalla.service';
import { CreateNotificacionesPantallaArrayInput } from './dto/notificacionespantalla.dto';
import { NotificacionesPantallaService } from './notificacionespantalla.service';

describe('NotificacionesPantalla Service', () => {
    let prismaService: PrismaService;
    let notificacionesPantallaService: NotificacionesPantallaService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                NotificacionesPantallaService, PlantillasPantallaService,
                {
                    provide: PrismaService,
                    useFactory: () => ({
                        notificacionesPantalla: {
                            findFirst: jest.fn(),
                            findMany: jest.fn(),
                            findUnique: jest.fn(),
                            create: jest.fn(),
                            createMany: jest.fn(),
                            update: jest.fn(),
                        },
                        plantillasPantalla: {
                            findUnique: jest.fn(),
                        }
                    }),
                },
            ],
        }).compile();

        notificacionesPantallaService = module.get<NotificacionesPantallaService>(NotificacionesPantallaService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    describe('getNotificacionesPantalla method', () => {
        it('should invoke prismaService.notificacionesPantallaService.findMany', async () => {
            await notificacionesPantallaService.getNotificacionesPantalla();
            expect(prismaService.notificacionesPantalla.findMany).toHaveBeenCalled();
        });
    });

    describe('getNotificacionPantallaById method', () => {
        it('should invoke prismaService.notificacionesPantallaService.findUnique', async () => {
            const testParams = {
                notificacion_id: 1
            };
            await notificacionesPantallaService.getNotificacionPantallaById(
                testParams.notificacion_id
            );
            expect(prismaService.notificacionesPantalla.findUnique).toHaveBeenCalled();
        });
    });

    describe('createNotificacionPantalla method', () => {
        it('should invoke prismaService.notificacionesPantallaService.createMany', async () => {
            const testParams: CreateNotificacionesPantallaArrayInput = {
                data: [
                    { plantilla_pantalla_id: 1, usuario_destino: 1 }
                ]

            };
            await notificacionesPantallaService.createNotificacionPantalla(testParams);
            expect(prismaService.notificacionesPantalla.createMany).toHaveBeenCalled();
        });
    });

    describe('updateNotificacionPantalla method', () => {
        it('should invoke prismaService.notificacionesPantallaService.update', async () => {
            const testParams = {
                data: {
                    notificacion_pantalla_id: 1,
                    plantilla_pantalla_id: 3
                }
            };
            await notificacionesPantallaService.updateNotificacionPantalla(
                testParams.data
            );
            expect(prismaService.notificacionesPantalla.update).toHaveBeenCalled();
        });
    });

})