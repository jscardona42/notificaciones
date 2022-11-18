import { Test } from '@nestjs/testing';
import { ProveedoresMensajeriaParametrosValoresResolver } from './proveedoresmensajeriaparametrosvalores.resolver';
import { ProveedoresMensajeriaParametrosValoresService } from './proveedoresmensajeriaparametrosvalores.service';


describe('ProveedoresMensajeriaParametrosValorById Resolver', () => {
    let proveedoresMensajeriaParametrosValoresResolver: ProveedoresMensajeriaParametrosValoresResolver;
    let proveedoresMensajeriaParametrosValoresService: ProveedoresMensajeriaParametrosValoresService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ProveedoresMensajeriaParametrosValoresResolver,
                {
                    provide: ProveedoresMensajeriaParametrosValoresService,
                    useFactory: () => ({
                        getProveedoresMensajeriaParametrosValores: jest.fn(),
                        getProveedorMensajeriaParametroValorById: jest.fn(),
                        createProveedoresMensajeriaParametrosValores: jest.fn(),
                        updateProveedoresMensajeriaParametrosValores: jest.fn(),
                        deleteProveedoresMensajeriaParametrosValores: jest.fn()
                    }),
                },
            ],
        }).compile();

        proveedoresMensajeriaParametrosValoresResolver = module.get<ProveedoresMensajeriaParametrosValoresResolver>(ProveedoresMensajeriaParametrosValoresResolver);
        proveedoresMensajeriaParametrosValoresService = module.get<ProveedoresMensajeriaParametrosValoresService>(ProveedoresMensajeriaParametrosValoresService);
    });

    describe('Query getProveedoresMensajeriaParametrosValores()', () => {
        it('should invoke proveedoresMensajeriaParametrosValoresService.getProveedoresMensajeriaParametrosValores()', async () => {
            await proveedoresMensajeriaParametrosValoresResolver.getProveedoresMensajeriaParametrosValores();
            expect(proveedoresMensajeriaParametrosValoresService.getProveedoresMensajeriaParametrosValores).toHaveBeenCalled();
        });
    });

    describe('Query getProveedorMensajeriaParametroValorById()', () => {
        it('should invoke proveedoresMensajeriaParametrosValoresService.getProveedorMensajeriaParametroValorById', async () => {
            const testParams = {
                pro_men_parametro_valor_id: 1
            };
            await proveedoresMensajeriaParametrosValoresResolver.getProveedorMensajeriaParametroValorById(testParams.pro_men_parametro_valor_id);
            expect(proveedoresMensajeriaParametrosValoresService.getProveedorMensajeriaParametroValorById).toHaveBeenCalled();
        });
    });

    describe('Mutation createProveedorMensajeria()', () => {
        it('should invoke proveedoresMensajeriaParametrosValoresService.createProveedorMensajeria', async () => {
            const testParams = {

                    proveedor_mensajeria_id: 1,
                    pro_mensajeria_parametro_id: 1,
                    valor: "Test"
                
            };

            await proveedoresMensajeriaParametrosValoresResolver.createProveedoresMensajeriaParametrosValores(testParams);
            expect(proveedoresMensajeriaParametrosValoresService.createProveedoresMensajeriaParametrosValores).toHaveBeenCalledWith(testParams);
        });
    });

    describe('Mutation updateProveedorMensajeria()', () => {
        it('should invoke proveedoresMensajeriaParametrosValoresService.updateProveedorMensajeria', async () => {
            const testParams = {

                    pro_men_parametro_valor_id: 1,
                    proveedor_mensajeria_id: 1,
                    pro_mensajeria_parametro_id: 1,
                    valor: "Test"

            };
            await proveedoresMensajeriaParametrosValoresResolver.updateProveedoresMensajeriaParametrosValores(testParams);
            expect(proveedoresMensajeriaParametrosValoresService.updateProveedoresMensajeriaParametrosValores).toHaveBeenCalledWith(testParams);
        });
    });

    describe('Mutation deleteProveedorMensajeria()', () => {
        it('should invoke proveedoresMensajeriaParametrosValoresService.deleteProveedorMensajeria', async () => {
            const testParams = {
                pro_men_parametro_valor_id: 1
            };
            await proveedoresMensajeriaParametrosValoresResolver.deleteProveedoresMensajeriaParametrosValores(testParams.pro_men_parametro_valor_id);
            expect(proveedoresMensajeriaParametrosValoresService.deleteProveedoresMensajeriaParametrosValores).toHaveBeenCalled();
        });
    });
});