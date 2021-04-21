import { Module } from '@nestjs/common';
import { ApolloServer } from 'apollo-server-express';
import { VehicleService } from './vehicle.service';
import { VehiclesResolver } from './vehicles.resolver';

@Module({
    imports:[],
  providers: [VehicleService,VehiclesResolver]
})
export class VehicleModule {}
