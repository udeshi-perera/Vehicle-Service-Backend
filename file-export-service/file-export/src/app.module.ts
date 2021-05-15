import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleModule } from './vehicle/vehicle.module';
import { VehicleService } from './vehicle/vehicle.service';

@Module({
  imports: [GraphQLModule.forRoot({
    autoSchemaFile: 'schema.gql'
  }),
  VehicleModule],
  controllers: [AppController],
  providers: [AppService,VehicleService],
})
export class AppModule {}
