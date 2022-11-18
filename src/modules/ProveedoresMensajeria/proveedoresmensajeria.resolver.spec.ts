import { Test } from '@nestjs/testing';
import { ProveedoresMensajeriaResolver } from './proveedoresmensajeria.resolver';
import { ProveedoresMensajeriaService } from './proveedoresmensajeria.service';

describe('Icono Resolver', () => {
    let proveedoresMensajeriaResolver: ProveedoresMensajeriaResolver;
    let proveedoresMensajeriaService: ProveedoresMensajeriaService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ProveedoresMensajeriaResolver,
                {
                    provide: ProveedoresMensajeriaService,
                    useFactory: () => ({
                        getProveedoresMensajeria: jest.fn(),
                        getProveedorMensajeriaById: jest.fn(),
                        createProveedorMensajeria: jest.fn(),
                        updateProveedorMensajeria: jest.fn(),
                        deleteProveedorMensajeria: jest.fn()
                    }),
                },
            ],
        }).compile();

        proveedoresMensajeriaResolver = module.get<ProveedoresMensajeriaResolver>(ProveedoresMensajeriaResolver);
        proveedoresMensajeriaService = module.get<ProveedoresMensajeriaService>(ProveedoresMensajeriaService);
    });

    describe('Query getProveedoresMensajeria()', () => {
        it('should invoke proveedoresMensajeriaService.getProveedoresMensajeria()', async () => {
            await proveedoresMensajeriaResolver.getProveedoresMensajeria();
            expect(proveedoresMensajeriaService.getProveedoresMensajeria).toHaveBeenCalled();
        });
    });

    describe('Query getProveedorMensajeriaById()', () => {
        it('should invoke proveedoresMensajeriaService.getProveedorMensajeriaById', async () => {
            const testParams = {
                proveedor_mensajeria_id: 1
            };
            await proveedoresMensajeriaResolver.getProveedorMensajeriaById(testParams.proveedor_mensajeria_id);
            expect(proveedoresMensajeriaService.getProveedorMensajeriaById).toHaveBeenCalled();
        });
    });

    // describe('Mutation createProveedorMensajeria()', () => {
    //     it('should invoke proveedoresMensajeriaService.createProveedorMensajeria', async () => {
    //         const testParams = {
    //             data: {
    //                 nombre: "nombre",
    //                 MedioMensajeria: "CORREO"
    //             }
    //         };

    //         await proveedoresMensajeriaResolver.createProveedorMensajeria(testParams.data);
    //         expect(proveedoresMensajeriaService.createProveedorMensajeria).toHaveBeenCalledWith(testParams);
    //     });
    // });

    describe('Mutation updateProveedorMensajeria()', () => {
        it('should invoke proveedoresMensajeriaService.updateProveedorMensajeria', async () => {
            const testParams = {
                proveedor_mensajeria_id: 1,
                nombre: "nombre",
            };
            await proveedoresMensajeriaResolver.updateProveedorMensajeria(testParams);
            expect(proveedoresMensajeriaService.updateProveedorMensajeria).toHaveBeenCalledWith(testParams);
        });
    });

    describe('Mutation deleteProveedorMensajeria()', () => {
        it('should invoke proveedoresMensajeriaService.deleteProveedorMensajeria', async () => {
            const testParams = {
                proveedor_mensajeria_id: 1
            };
            await proveedoresMensajeriaResolver.deleteProveedorMensajeria(testParams.proveedor_mensajeria_id);
            expect(proveedoresMensajeriaService.deleteProveedorMensajeria).toHaveBeenCalled();
        });
    });
});