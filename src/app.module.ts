import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { NotificacionesResolver } from './modules/Notificaciones/notificaciones.resolver';
import { NotificacionesService } from './modules/Notificaciones/notificaciones.service';
import { PlantillasCorreoResolver } from './modules/Plantillas/plantillascorreo.resolver';
import { PlantillasCorreoService } from './modules/Plantillas/plantillascorreo.service';
import { PlantillasNotificacionesResolver } from './modules/PlantillasNotificaciones/plantillasnotificaciones.resolver';
import { PlantillasNotificacionesService } from './modules/PlantillasNotificaciones/plantillasnotificaciones.service';
import { ProveedoresMensajeriaController } from './modules/ProveedoresMensajeria/proveedoresmensajeria.controller';
import { ProveedoresMensajeriaResolver } from './modules/ProveedoresMensajeria/proveedoresmensajeria.resolver';
import { ProveedoresMensajeriaService } from './modules/ProveedoresMensajeria/proveedoresmensajeria.service';
import { ProveedoresMensajeriaParametrosValoresResolver } from './modules/ProveedoresMensajeriaParametrosValores/proveedoresmensajeriaparametrosvalores.resolver';
import { ProveedoresMensajeriaParametrosValoresService } from './modules/ProveedoresMensajeriaParametrosValores/proveedoresmensajeriaparametrosvalores.service';
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
  controllers: [ProveedoresMensajeriaController],
  providers: [PrismaService, ProveedoresMensajeriaService, ProveedoresMensajeriaResolver, ProveedoresMensajeriaParametrosValoresService, ProveedoresMensajeriaParametrosValoresResolver, PlantillasNotificacionesService, PlantillasNotificacionesResolver, PlantillasCorreoService, PlantillasCorreoResolver, NotificacionesService, NotificacionesResolver],
})
export class AppModule { }
