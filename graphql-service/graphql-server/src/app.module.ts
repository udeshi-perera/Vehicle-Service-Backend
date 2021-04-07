import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { VehiclesModule } from './vehicle/vehicles.module';

@Module({
  imports: [
    VehiclesModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
