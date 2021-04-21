import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GetVehicleArgs } from "./dto/args/get-vehicle.args";
import { Vehicle } from "./models/vehicle";
import { VehicleService } from "./vehicle.service";
import { request, gql } from 'graphql-request'
import { GetVehiclesArgs } from "./dto/args/get-vehicles.args";
import { DeleteUserInput } from "./dto/input/delete-user-input";
import { UpdateUserInput } from "./dto/input/update-user-input";

@Resolver(()=>Vehicle)
export class VehiclesResolver {
  constructor(
    private readonly vehicleService: VehicleService
  ) {}

  private vehicles: Vehicle[]=[];

  @Query(()=>String)
  async hello() {
    return 'hello';
  }

@Query(() => Vehicle, { nullable: true })
 async vehicleById(@Args() getVehicleArgs:GetVehicleArgs) {

  console.log(getVehicleArgs.id)
  const id=getVehicleArgs.id;
  const query=gql`
    query{
      vehicleById(id: ${getVehicleArgs.id}) {
        carMake
        email
        carModel
        firstName
        id
        lastName
        manufacturedDate
        vinNumber
    }
  }
  `;
  const dataDetail= await request('http://localhost:5000/graphql',query)
console.log(dataDetail.vehicleById);
return dataDetail.vehicleById;
}

@Query(() => [Vehicle], { nullable: true })
async getVehicles (){

  const query1=gql`
  query  {
    allVehicles {
        nodes {
          id
          firstName
          email
          carModel
          carMake
          lastName
          manufacturedDate
          vinNumber
        }
      }
  }
`;
const dataDetail= await request('http://localhost:5000/graphql',query1)
console.log(dataDetail.allVehicles);
return dataDetail.allVehicles.nodes;
}

@Mutation(()=>Vehicle)
async deleteVehicle(@Args('deleteVehicleData')deleteVehicleData:DeleteUserInput){

  const deleteQuery=gql`
  mutation {
    deleteVehicleById(input: {id: ${deleteVehicleData.id}}) {
      deletedVehicleId
    }
  }
`;

const deleteData=await request('http://localhost:5000/graphql',deleteQuery)
console.log(deleteData.deleteVehicleById.id)
return deleteData.deleteVehicleById.id;
}

@Mutation(()=>Vehicle)
async updateVehicle(@Args('updateVehicleData')updateVehicleData:UpdateUserInput){
  const updateQuery=gql`
  mutation {
    updateVehicleById(
      input: {vehiclePatch:
        {carMake: ${updateVehicleData.carMake},
        carModel: ${updateVehicleData.carModel}, 
        firstName: ${updateVehicleData.firstName},
        email: ${updateVehicleData.email},
        lastName: ${updateVehicleData.lastName}, 
        manufacturedDate: ${updateVehicleData.manufacturedDate},
        vinNumber: ${updateVehicleData.vinNumber}},
        id: ${updateVehicleData.id}}
    ) {
      vehicle {
        firstName
        carModel
        carMake
        manufacturedDate
        lastName
        email
        vinNumber
      }
    }
  }
  `;

  const updatedData=await request('http://localhost:5000/graphql',updateQuery)
  console.log(updatedData);
}
}