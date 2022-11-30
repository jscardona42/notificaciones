import { Test } from '@nestjs/testing';
import { ProveedoresMensajeriaParametrosResolver } from './proveedoresmensajeriaparametros.resolver';
import { ProveedoresMensajeriaParametrosService } from './proveedoresmensajeriaparametros.service';


describe('ProveedoresMensajeriaParametrosValorById Resolver', () => {
    let proveedoresMensajeriaParametrosResolver: ProveedoresMensajeriaParametrosResolver;
    let proveedoresMensajeriaParametrosService: ProveedoresMensajeriaParametrosService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ProveedoresMensajeriaParametrosResolver,
                {
                    provide: ProveedoresMensajeriaParametrosService,
                    useFactory: () => ({
                        getProveedoresMensajeriaParametros: jest.fn(),
                        getProveedorMensajeriaParametroById: jest.fn(),
                        createProveedorMensajeriaParametro: jest.fn(),
                        updateProveedorMensajeriaParametro: jest.fn(),
                        deleteProveedorMensajeriaParametro: jest.fn()
                    }),
                },
            ],
        }).compile();

        proveedoresMensajeriaParametrosResolver = module.get<ProveedoresMensajeriaParametrosResolver>(ProveedoresMensajeriaParametrosResolver);
        proveedoresMensajeriaParametrosService = module.get<ProveedoresMensajeriaParametrosService>(ProveedoresMensajeriaParametrosService);
    });

    describe('Query getProveedoresMensajeriaParametros()', () => {
        it('should invoke proveedoresMensajeriaParametrosService.getProveedoresMensajeriaParametros()', async () => {
            await proveedoresMensajeriaParametrosResolver.getProveedoresMensajeriaParametros();
            expect(proveedoresMensajeriaParametrosService.getProveedoresMensajeriaParametros).toHaveBeenCalled();
        });
    });

    describe('Query getProveedorMensajeriaParametroById()', () => {
        it('should invoke proveedoresMensajeriaParametrosService.getProveedorMensajeriaParametroById', async () => {
            const testParams = {
                pro_men_parametro_id: 1
            };
            await proveedoresMensajeriaParametrosResolver.getProveedorMensajeriaParametroById(testParams.pro_men_parametro_id);
            expect(proveedoresMensajeriaParametrosService.getProveedorMensajeriaParametroById).toHaveBeenCalled();
        });
    });

    describe('Mutation createProveedorMensajeria()', () => {
        it('should invoke proveedoresMensajeriaParametrosService.createProveedorMensajeria', async () => {
            const testParams = {
                nombre: "llave",
                valor: "Test"
            };

            await proveedoresMensajeriaParametrosResolver.createProveedorMensajeriaParametro(testParams);
            expect(proveedoresMensajeriaParametrosService.createProveedorMensajeriaParametro).toHaveBeenCalledWith(testParams);
        });
    });

    describe('Mutation updateProveedorMensajeria()', () => {
        it('should invoke proveedoresMensajeriaParametrosService.updateProveedorMensajeria', async () => {
            const testParams = {

                pro_men_parametro_id: 1,
                proveedor_mensajeria_id: 1,
                pro_mensajeria_parametro_id: 1,
                valor: "Test"

            };
            await proveedoresMensajeriaParametrosResolver.updateProveedorMensajeriaParametro(testParams);
            expect(proveedoresMensajeriaParametrosService.updateProveedorMensajeriaParametro).toHaveBeenCalledWith(testParams);
        });
    });

    describe('Mutation deleteProveedorMensajeria()', () => {
        it('should invoke proveedoresMensajeriaParametrosService.deleteProveedorMensajeria', async () => {
            const testParams = {
                pro_men_parametro_id: 1
            };
            await proveedoresMensajeriaParametrosResolver.deleteProveedorMensajeriaParametro(testParams.pro_men_parametro_id);
            expect(proveedoresMensajeriaParametrosService.deleteProveedorMensajeriaParametro).toHaveBeenCalled();
        });
    });
});