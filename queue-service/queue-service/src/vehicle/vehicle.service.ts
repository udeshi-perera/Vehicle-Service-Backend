import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue} from 'bull';
import * as fs from 'fs';
import * as csv from 'fast-csv';
// import { Vehicle } from './vehicle.entity';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Pool} from 'pg'
import { getConnection, Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { VehicleDTO } from './vehicle.dto';

@Injectable()
export class VehicleService {

    constructor(@InjectQueue('readData') private readDataQueue: Queue,@InjectRepository(Vehicle) private vehicleRepository:Repository<Vehicle>){}

    async readDataFile(job:Express.Multer.File){
        console.log("vehicle service");
        const vehicleDetail=[];
        console.log(job.path);
        //     fs.createReadStream(job.path)
        //     .pipe(csv.parse({}))
        //     .on('data',function(data)->{
        //         console.log(data);
        //     })
        //     .on('end',function(data){
        //     console.log("Finished");
        // })


        // fs.createReadStream(job.path)
        //     .pipe(csv.parse({}))
        //     .on('data',(data) => vehicleDetail.push(data))
        //     .on('end',()=>{
        //         // vehicleDetail.shift();
        //         // // console.log(vehicleDetail);
        //         // this.uploadCsvDetail(vehicleDetail);

        //         getConnection().createQueryBuilder().insert().into(Vehicle)
        //         .values(vehicleDetail).execute().finally(()=>console.log("Finished"));
        //     });

        


            fs.createReadStream(job.path)
            .pipe(csv.parse({}))
            .on('data',data =>{
                const currentDate: Date = new Date(); 

                console.log("- ** - "+data);
                vehicleDetail.push(data)
             //Vehicle Object
                const  vehicleData=new Vehicle();
                vehicleData.id=data[0];
                vehicleData.first_name=data[1];
                vehicleData.last_name=data[2];
                vehicleData.email=data[3];
                vehicleData.car_make=data[4];
                vehicleData.car_model=data[5];
                vehicleData.vin_number=data[6];
                vehicleData.manufactured_date=data[7];
                const manufDate:Date = new Date(data[7]);
                vehicleData.age_of_vehicle=currentDate.getDate()-manufDate.getDate();
                getConnection().createQueryBuilder().insert().into(Vehicle)
               .values(vehicleData).execute().finally(()=>console.log("Finished"));
                
            } )
            .on('end',async ()=>{
                // vehicleDetail.shift();
                // // console.log(vehicleDetail);
                // this.uploadCsvDetail(vehicleDetail);
                // const a='\{'96',
                // 'Colline',
                // 'Roderham',
                // 'Revolucion',
                // 'BMW',
                // 'X5',
                // '2G4WY55J621002775',
                // '1/20/1987'}';
                // console.log(vehicleDetail);
                const  v=new Vehicle();
                v.id=1;
                v.first_name="hjg";
                v.last_name="dterstj";
                v.car_model="tffy";
                v.car_make="gfthd";
                v.email="vghf";
                // v.manufactured_ae='11/10/1988'
                v.vin_number="6757";

            
                //const repository = getConnection.Vehicl(User);

            //    await getConnection().createQueryBuilder().insert().into(Vehicle)
            //     .values(v).execute().finally(()=>console.log("Finished"));
            });
    }


    async updateRecord(id: number,data: Partial<VehicleDTO>){
        return await this.vehicleRepository.update({id},data);
        return await this.vehicleRepository.findOne({id});
    }

    async deleteRecord(id:number){
        await this.vehicleRepository.delete({id});
        return {deleted: true};
    }

    async uploadCsvDetail(data){
         console.log(data);
        console.log("data uploading111");
    }

    async getByModelName(car_model:string){
        return await this.vehicleRepository
        .createQueryBuilder()
        .where("Vehicle.car_model like :model",{model:'%'+car_model+'%'})
        .getMany();
    }


    getHello(): string {
        return 'Hello World!';
      }
}
