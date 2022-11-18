import { registerEnumType } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';
import { MedioMensajeria } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { ProveedoresMensajeriaService } from './proveedoresmensajeria.service';

registerEnumType(MedioMensajeria, {
    name: 'MedioMensajeria'
})

describe('ProveedoresMensajeria Service', () => {
    let prismaService: PrismaService;
    let proveedoresMensajeriaService: ProveedoresMensajeriaService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                ProveedoresMensajeriaService,
                {
                    provide: PrismaService,
                    useFactory: () => ({
                        proveedoresMensajeria: {
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

        proveedoresMensajeriaService = module.get<ProveedoresMensajeriaService>(ProveedoresMensajeriaService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    describe('getProveedoresMensajeria method', () => {
        it('should invoke prismaService.proveedoresMensajeriaService.findMany', async () => {
            await proveedoresMensajeriaService.getProveedoresMensajeria();
            expect(prismaService.proveedoresMensajeria.findMany).toHaveBeenCalled();
        });
    });

    describe('getProveedorMensajeriaById method', () => {
        it('should invoke prismaService.proveedoresMensajeriaService.findUnique', async () => {
            const testParams = {
                proveedor_mensajeria_id: 1
            };
            await proveedoresMensajeriaService.getProveedorMensajeriaById(
                testParams.proveedor_mensajeria_id
            );
            expect(prismaService.proveedoresMensajeria.findUnique).toHaveBeenCalled();
        });
    });

    // describe('createProveedorMensajeria method', () => {
    //     it('should invoke prismaService.proveedoresMensajeriaService.create', async () => {
    //         const testParams = {
    //             data: {
    //                 nombre: "nombre",
    //                 MedioMensajeria: "CORREO"
    //             }
    //         };
    //         await proveedoresMensajeriaService.createProveedorMensajeria(
    //             testParams.data,
    //         );
    //         expect(prismaService.proveedoresMensajeria.create).toHaveBeenCalled();
    //     });
    // });

    describe('updateProveedorMensajeria method', () => {
        it('should invoke prismaService.proveedoresMensajeriaService.update', async () => {
            const testParams = {
                data: {
                    proveedor_mensajeria_id: 1,
                    nombre: "nombre",
                }
            };
            await proveedoresMensajeriaService.updateProveedorMensajeria(
                testParams.data
            );
            expect(prismaService.proveedoresMensajeria.update).toHaveBeenCalled();
        });
    });

    describe('deleteProveedorMensajeria method', () => {
        it('should invoke prismaService.proveedoresMensajeriaService.update', async () => {
            const testParams = {
                proveedor_mensajeria_id: 1
            };
            await proveedoresMensajeriaService.deleteProveedorMensajeria(
                testParams.proveedor_mensajeria_id
            );
            expect(prismaService.proveedoresMensajeria.delete).toHaveBeenCalled();
        });
    });

})