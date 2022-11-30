import { registerEnumType } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { MedioMensajeria } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { CreateProveedoresMensajeriaParametroInput } from './dto/proveedoresmensajeriaparametros.dto';
import { ProveedoresMensajeriaParametrosService } from './proveedoresmensajeriaparametros.service';


registerEnumType(MedioMensajeria, {
    name: 'MedioMensajeria'
})

describe('ProveedoresMensajeriaParametros Service', () => {
    let prismaService: PrismaService;
    let proveedoresMensajeriaParametrosService: ProveedoresMensajeriaParametrosService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ProveedoresMensajeriaParametrosService,
                {
                    provide: PrismaService,
                    useFactory: () => ({
                        proveedoresMensajeriaParametros: {
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

        proveedoresMensajeriaParametrosService = module.get<ProveedoresMensajeriaParametrosService>(ProveedoresMensajeriaParametrosService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    describe('getProveedoresMensajeriaParametros method', () => {
        it('should invoke prismaService.proveedoresMensajeriaParametrosService.findMany', async () => {
            await proveedoresMensajeriaParametrosService.getProveedoresMensajeriaParametros();
            expect(prismaService.proveedoresMensajeriaParametros.findMany).toHaveBeenCalled();
        });
    });

    describe('getProveedorMensajeriaById method', () => {
        it('should invoke prismaService.proveedoresMensajeriaParametrosService.findUnique', async () => {
            const testParams = {
                pro_men_parametro_valor_id: 1
            };
            await proveedoresMensajeriaParametrosService.getProveedorMensajeriaParametroById(
                testParams.pro_men_parametro_valor_id
            );
            expect(prismaService.proveedoresMensajeriaParametros.findUnique).toHaveBeenCalled();
        });
    });

    describe('createProveedorMensajeriaParametro method', () => {
        it('should invoke prismaService.proveedoresMensajeriaParametrosService.create', async () => {
            const testParams: CreateProveedoresMensajeriaParametroInput = {
                nombre: "llave",
                valor: "123",
                descripcion: ""
            };
            await proveedoresMensajeriaParametrosService.createProveedorMensajeriaParametro(
                testParams,
            );
            expect(prismaService.proveedoresMensajeriaParametros.create).toHaveBeenCalled();
        });
    });

    describe('updateProveedorMensajeriaParametro method', () => {
        it('should invoke prismaService.proveedoresMensajeriaParametrosService.update', async () => {
            const testParams = {
                data: {
                    proveedor_mensajeria_id: 1,
                    pro_mensajeria_parametro_id: 1,
                    valor: "Test"
                }
            };
            await proveedoresMensajeriaParametrosService.updateProveedorMensajeriaParametro(
                testParams.data
            );
            expect(prismaService.proveedoresMensajeriaParametros.update).toHaveBeenCalled();
        });
    });

    describe('deleteProveedorMensajeriaParametro method', () => {
        it('should invoke prismaService.proveedoresMensajeriaParametrosService.update', async () => {
            const testParams = {
                pro_men_parametro_valor_id: 1
            };
            await proveedoresMensajeriaParametrosService.deleteProveedorMensajeriaParametro(
                testParams.pro_men_parametro_valor_id
            );
            expect(prismaService.proveedoresMensajeriaParametros.delete).toHaveBeenCalled();
        });
    });

})