import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path';
import { VehiclesResolver } from './vehicles.resolver';
import { VehicleService } from './vehicle.service';

@Module({
  imports:[],
  providers: [VehiclesResolver,VehicleService],
})
export class VehiclesModule {}
