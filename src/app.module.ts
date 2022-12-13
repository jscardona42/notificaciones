import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { NotificacionesController } from './modules/Notificaciones/notificaciones.controller';
import { NotificacionesService } from './modules/Notificaciones/notificaciones.service';
import { NotificacionesPantallaController } from './modules/NotificacionesPantalla/notificacionespantalla.controller';
import { NotificacionesPantallaService } from './modules/NotificacionesPantalla/notificacionespantalla.service';
import { PlantillasCorreoResolver } from './modules/PlantillasCorreo/plantillascorreo.resolver';
import { PlantillasCorreoService } from './modules/PlantillasCorreo/plantillascorreo.service';
import { PlantillasPantallaResolver } from './modules/PlantillasPantalla/plantillaspantalla.resolver';
import { PlantillasPantallaService } from './modules/PlantillasPantalla/plantillaspantalla.service';
import { PlantillasWhatsappResolver } from './modules/PlantillasWhatsapp/plantillaswhatsapp.resolver';
import { PlantillasWhatsappService } from './modules/PlantillasWhatsapp/plantillaswhatsapp.service';
import { ProveedoresMensajeriaResolver } from './modules/ProveedoresMensajeria/proveedoresmensajeria.resolver';
import { ProveedoresMensajeriaService } from './modules/ProveedoresMensajeria/proveedoresmensajeria.service';
import { ProveedoresMensajeriaParametrosService } from './modules/ProveedoresMensajeriaParametros/proveedoresmensajeriaparametros.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      cors: {
        origin: '*',
        credentials: true,
      },
      context: ({ req, res }) => ({
        req: req,
        res: res
      }),
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    }),
  ],
  controllers: [NotificacionesController, NotificacionesPantallaController],
  providers: [PrismaService, ProveedoresMensajeriaService, ProveedoresMensajeriaResolver, ProveedoresMensajeriaParametrosService, ProveedoresMensajeriaParametrosService, PlantillasPantallaService, PlantillasPantallaResolver, PlantillasCorreoService, PlantillasCorreoResolver, NotificacionesPantallaService, NotificacionesService, PlantillasWhatsappService, PlantillasWhatsappResolver],
})
export class AppModule { }
