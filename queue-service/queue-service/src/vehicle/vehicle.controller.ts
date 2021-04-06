import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { Queue} from 'bull'
import { FileInterceptor } from '@nestjs/platform-express';
import { Express} from 'express'
import { VehicleDTO } from './vehicle.dto';
import { Observable } from 'rxjs';

@Controller('vehicle')
export class VehicleController {

    constructor(private vehicleService:VehicleService,@InjectQueue('readData') private readData: Queue){}

    @Post('csvFile')
    @UseInterceptors(FileInterceptor('csvFile'))
    async readDataFile(@UploadedFile() csvFile: Express.Multer.File){
        console.log("HEllo");
         this.readData.add('transcode',{
            csvFile: csvFile
        },
        {
            delay: 1000
        });
    }


    @Put(':id')
    updateVehicle(@Param('id')id:number,@Body() data:Partial<VehicleDTO>){
        return this.vehicleService.updateRecord(id,data);
    }

    @Delete(':id')
    removeVehicleDetail(@Param('id')id:number){
        return this.vehicleService.deleteRecord(id);
    }

    @Get()
    viewByModelName(car_model:string){
        return this.vehicleService.getByModelName(car_model);
    }

    @Get()
    getHello(): string {
      return this.vehicleService.getHello();
    }
}
