import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { VehicleModule } from './vehicle/vehicle.module';

@Module({
  imports: [GraphQLModule.forRoot({
    autoSchemaFile: 'schema.gql'
  }),
  VehicleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
