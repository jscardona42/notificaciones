import { Test } from '@nestjs/testing';
import { NotificacionesPantallaResolver } from './notificacionespantalla.resolver';
import { NotificacionesPantallaService } from './notificacionespantalla.service';

describe('NotificacionesPantalla Resolver', () => {
    let notificacionesPantallaResolver: NotificacionesPantallaResolver;
    let notificacionesPantallaService: NotificacionesPantallaService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                NotificacionesPantallaResolver,
                {
                    provide: NotificacionesPantallaService,
                    useFactory: () => ({
                        getNotificacionesPantalla: jest.fn(),
                        getNotificacionPantallaById: jest.fn(),
                        createNotificacionPantalla: jest.fn(),
                        updateNotificacionPantalla: jest.fn(),
                    }),
                },
            ],
        }).compile();

        notificacionesPantallaResolver = module.get<NotificacionesPantallaResolver>(NotificacionesPantallaResolver);
        notificacionesPantallaService = module.get<NotificacionesPantallaService>(NotificacionesPantallaService);
    });

    describe('Query getNotificacionesPantalla()', () => {
        it('should invoke notificacionesPantallaService.getNotificacionesPantalla()', async () => {
            await notificacionesPantallaResolver.getNotificacionesPantalla();
            expect(notificacionesPantallaService.getNotificacionesPantalla).toHaveBeenCalled();
        });
    });

    describe('Query getNotificacionPantallaById()', () => {
        it('should invoke notificacionesPantallaService.getNotificacionPantallaById', async () => {
            const testParams = {
                notificacion_id: 1
            };
            await notificacionesPantallaResolver.getNotificacionPantallaById(testParams.notificacion_id);
            expect(notificacionesPantallaService.getNotificacionPantallaById).toHaveBeenCalled();
        });
    });

    describe('Mutation createNotificacionPantalla()', () => {
        it('should invoke notificacionesPantallaService.createNotificacionPantalla', async () => {
            const testParams = {
                data: {
                    usuario_destino: 106,
                    plantilla_pantalla_id: 2
                }
            };

            await notificacionesPantallaResolver.createNotificacionPantalla(testParams.data);
            expect(notificacionesPantallaService.createNotificacionPantalla).toHaveBeenCalledWith(testParams.data);
        });
    });

    describe('Mutation updateNotificacionPantalla()', () => {
        it('should invoke notificacionesPantallaService.updateNotificacionPantalla', async () => {
            const testParams = {
                data: {
                    notificacion_pantalla_id: 1,
                    plantilla_pantalla_id: 3
                }
            };
            await notificacionesPantallaResolver.updateNotificacionPantalla(testParams.data);
            expect(notificacionesPantallaService.updateNotificacionPantalla).toHaveBeenCalledWith(testParams.data);
        });
    });
});