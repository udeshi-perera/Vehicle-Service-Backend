import { HttpService, Injectable, Post } from '@nestjs/common';
import { GetVehicleArgs } from './dto/args/get-vehicle.args';
import { Vehicle } from './models/vehicle';
import { request, gql } from 'graphql-request'


@Injectable()
export class VehicleService {

    private vehicles: Vehicle[]=[];

//    async getVehicle(getVehicleArgs:GetVehicleArgs):Promise<Vehicle> {


//     const fetch = require('node-fetch');
//     fetch('http://localhost:3000/graphql',{
//         method: 'POST',
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({
//             query: `
//             query{
//                 vehicleById(id: 10) {
//                   carMake
//                   email
//                 }
//               }
//             `
//         })
//     }).then(res=>res.json).then((data)=>{
//         console.log(data)
//     })
//     return ;

//      } 
}
