import { registerEnumType } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { MedioMensajeria } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { ProveedoresMensajeriaParametrosValoresService } from './proveedoresmensajeriaparametrosvalores.service';


registerEnumType(MedioMensajeria, {
    name: 'MedioMensajeria'
})

describe('ProveedoresMensajeriaParametrosValores Service', () => {
    let prismaService: PrismaService;
    let proveedoresMensajeriaParametrosValoresService: ProveedoresMensajeriaParametrosValoresService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ProveedoresMensajeriaParametrosValoresService,
                {
                    provide: PrismaService,
                    useFactory: () => ({
                        proveedoresMensajeriaParametrosValores: {
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

        proveedoresMensajeriaParametrosValoresService = module.get<ProveedoresMensajeriaParametrosValoresService>(ProveedoresMensajeriaParametrosValoresService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    describe('getProveedoresMensajeriaParametrosValores method', () => {
        it('should invoke prismaService.proveedoresMensajeriaParametrosValoresService.findMany', async () => {
            await proveedoresMensajeriaParametrosValoresService.getProveedoresMensajeriaParametrosValores();
            expect(prismaService.proveedoresMensajeriaParametrosValores.findMany).toHaveBeenCalled();
        });
    });

    describe('getProveedorMensajeriaById method', () => {
        it('should invoke prismaService.proveedoresMensajeriaParametrosValoresService.findUnique', async () => {
            const testParams = {
                pro_men_parametro_valor_id: 1
            };
            await proveedoresMensajeriaParametrosValoresService.getProveedorMensajeriaParametroValorById(
                testParams.pro_men_parametro_valor_id
            );
            expect(prismaService.proveedoresMensajeriaParametrosValores.findUnique).toHaveBeenCalled();
        });
    });

    describe('createProveedoresMensajeriaParametrosValores method', () => {
        it('should invoke prismaService.proveedoresMensajeriaParametrosValoresService.create', async () => {
            const testParams = {
                data: {
                    proveedor_mensajeria_id: 1,
                    pro_mensajeria_parametro_id: 1,
                    valor: "Test"
                }
            };
            await proveedoresMensajeriaParametrosValoresService.createProveedoresMensajeriaParametrosValores(
                testParams.data,
            );
            expect(prismaService.proveedoresMensajeriaParametrosValores.create).toHaveBeenCalled();
        });
    });

    describe('updateProveedoresMensajeriaParametrosValores method', () => {
        it('should invoke prismaService.proveedoresMensajeriaParametrosValoresService.update', async () => {
            const testParams = {
                data: {
                    pro_men_parametro_valor_id: 1,
                    proveedor_mensajeria_id: 1,
                    pro_mensajeria_parametro_id: 1,
                    valor: "Test"
                }
            };
            await proveedoresMensajeriaParametrosValoresService.updateProveedoresMensajeriaParametrosValores(
                testParams.data
            );
            expect(prismaService.proveedoresMensajeriaParametrosValores.update).toHaveBeenCalled();
        });
    });

    describe('deleteProveedoresMensajeriaParametrosValores method', () => {
        it('should invoke prismaService.proveedoresMensajeriaParametrosValoresService.update', async () => {
            const testParams = {
                pro_men_parametro_valor_id: 1
            };
            await proveedoresMensajeriaParametrosValoresService.deleteProveedoresMensajeriaParametrosValores(
                testParams.pro_men_parametro_valor_id
            );
            expect(prismaService.proveedoresMensajeriaParametrosValores.delete).toHaveBeenCalled();
        });
    });

})