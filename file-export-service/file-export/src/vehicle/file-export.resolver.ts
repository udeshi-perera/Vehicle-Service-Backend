import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetVehicleArgs } from './dto/args/get-data.args';
import { Vehicle } from './models/vehicle';
import { request, gql } from 'graphql-request'
import * as fs from 'fs';
import * as csv from 'fast-csv';

@Resolver(()=>Vehicle)
export class FileExportResolver {

@Query(() => [Vehicle], { nullable: true })
async vehicleByAge(@Args() getAge:GetVehicleArgs){
    console.log(getAge.ageOfVehicle);

    const query=gql`
    query {
        allVehicles(condition: {ageOfVehicle: ${getAge.ageOfVehicle}}) {
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
    return ageData.allVehicles.nodes;
}

}
