import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ProveedoresMensajeriaResolver } from './modules/ProveedoresMensajeria/proveedoresmensajeria.resolver';
import { ProveedoresMensajeriaService } from './modules/ProveedoresMensajeria/proveedoresmensajeria.service';
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
  controllers: [],
  providers: [PrismaService, ProveedoresMensajeriaService, ProveedoresMensajeriaResolver],
})
export class AppModule { }
