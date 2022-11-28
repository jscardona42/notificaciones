import { Test } from '@nestjs/testing';
import { NotificacionesResolver } from './notificaciones.resolver';
import { NotificacionesService } from './notificaciones.service';

describe('Notificaciones Resolver', () => {
    let notificacionesResolver: NotificacionesResolver;
    let notificacionesService: NotificacionesService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                NotificacionesResolver,
                {
                    provide: NotificacionesService,
                    useFactory: () => ({
                        getNotificaciones: jest.fn(),
                        getNotificacionById: jest.fn(),
                        createNotificaciones: jest.fn(),
                        updateNotificaciones: jest.fn(),
                    }),
                },
            ],
        }).compile();

        notificacionesResolver = module.get<NotificacionesResolver>(NotificacionesResolver);
        notificacionesService = module.get<NotificacionesService>(NotificacionesService);
    });

    describe('Query getNotificaciones()', () => {
        it('should invoke notificacionesService.getNotificaciones()', async () => {
            await notificacionesResolver.getNotificaciones();
            expect(notificacionesService.getNotificaciones).toHaveBeenCalled();
        });
    });

    describe('Query getNotificacionById()', () => {
        it('should invoke notificacionesService.getNotificacionById', async () => {
            const testParams = {
                notificacion_id: 1
            };
            await notificacionesResolver.getNotificacionById(testParams.notificacion_id);
            expect(notificacionesService.getNotificacionById).toHaveBeenCalled();
        });
    });

    describe('Mutation createNotificaciones()', () => {
        it('should invoke notificacionesService.createNotificaciones', async () => {
            const testParams = {
                data: {
                    usuario_destino: 106,
                    plantilla_notificacion_id: 2
                }
            };

            await notificacionesResolver.createNotificaciones(testParams.data);
            expect(notificacionesService.createNotificaciones).toHaveBeenCalledWith(testParams.data);
        });
    });

    describe('Mutation updateNotificaciones()', () => {
        it('should invoke notificacionesService.updateNotificaciones', async () => {
            const testParams = {
                data: {
                    notificacion_id: 1,
                    plantilla_notificacion_id: 3
                }
            };
            await notificacionesResolver.updateNotificaciones(testParams.data);
            expect(notificacionesService.updateNotificaciones).toHaveBeenCalledWith(testParams.data);
        });
    });
});