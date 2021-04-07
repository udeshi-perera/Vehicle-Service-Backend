import { Injectable } from '@nestjs/common';
import { GetVehicleArgs } from './dto/args/get-vehicle.args';
import { GetVehiclesArgs } from './dto/args/get-vehicles.args';
import { Vehicle } from './models/vehicle';

@Injectable()
export class VehicleService {

    private vehicles: Vehicle[]=[];


    // public deleteVehicle(): Vehicle{
    //     return
    // }

    public getVehicle(getVehicleArgs:GetVehicleArgs): Vehicle {
       return this.vehicles.find(vehicle=>vehicle.id===getVehicleArgs.id);
    } 

    // public getVehicles(getVehiclesArgs: GetVehiclesArgs): Vehicle[] {
    //     // return getVehiclesArgs.vehicleIds.map(id => this.getVehicle({ id }));
    //     // return getVehiclesArgs.vehicleIds.find.map()
    // }

    // public getAllVehicle(): Vehicle{
    //     return
    // }
}
