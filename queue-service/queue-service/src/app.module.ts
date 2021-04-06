import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleModule } from './vehicle/vehicle.module';
import { BullModule} from '@nestjs/bull'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [VehicleModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379
      }
    }), 
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
