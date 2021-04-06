import { Process, Processor } from "@nestjs/bull";
import { VehicleService } from "./vehicle.service";
import { Job } from "bull";
import { pipe } from "rxjs";
import * as fs from 'fs';
import * as csv from 'fast-csv';


@Processor('readData')
export class VehicleProcessor {

    constructor(private vehicleService:VehicleService){}

    @Process('transcode')
    readFile(job:Job){
        console.log(job.data.csvFile.path);
        console.log(job);
        this.vehicleService.readDataFile(job.data.csvFile);
        // const vehicleDetail=[];

        //    fs.createReadStream(job.data.csvFile.path)
        //     .pipe(csv.parse({}))
        //     .on('data',(data) => vehicleDetail.push(data))
        //     .on('end',()=>{
        //         //console.log(vehicleDetail)
        //         console.log("Read")
        //     })
    }
}

