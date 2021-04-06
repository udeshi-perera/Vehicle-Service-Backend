import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleProcessor } from './vehicle-processor';
import { VehicleController } from './vehicle.controller';
import { Vehicle } from './vehicle.entity';
import { VehicleService } from './vehicle.service';

@Module({
  imports:[
    BullModule.registerQueue({
      name: 'readData'
  }),
  MulterModule.register({
      dest: '../upload'
  }),
  TypeOrmModule.forRoot(),
  TypeOrmModule.forFeature([Vehicle])
  ],
  controllers: [VehicleController],
  providers: [VehicleService,VehicleProcessor]
})
export class VehicleModule {}
