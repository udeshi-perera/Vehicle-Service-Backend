import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { VehicleService } from './vehicle/vehicle.service';
import { request, gql } from 'graphql-request'
import * as fs from 'fs';
import * as csv from 'fast-csv';
import { GetVehicleArgs } from './vehicle/dto/args/get-data.args';
import { Query } from '@nestjs/graphql';
import { Vehicle } from './vehicle/models/vehicle';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private vehicleService:VehicleService) {
    
  }

  @Get(':age')
  @Query(() => [Vehicle], { nullable: true })
  async getHello(@Param('age')age:number): Promise<any> {
    console.log(age +"from contrller");
    const query=gql`
    query {
        allVehicles(condition: {ageOfVehicle: ${age}}) {
          nodes {
            carMake
            carModel
            email
            lastName
            firstName
          }
        }
      }
    `;
    const ageData=await request('http://localhost:5000/graphql',query);
    // console.log(ageData.allVehicles.nodes);
    const ws = fs.createWriteStream('my.csv');
var text
    var i;
    console.log(text)
for (i = 0; i < ageData.allVehicles.nodes.length; i++) {
  text = ageData.allVehicles.nodes[i];
  csv.write([
    text
  ],{headers:true}).pipe(ws)
  console.log(text);
}
  await  this.vehicleService.sendMessage();
  }
}
