import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GetVehicleArgs } from "./dto/args/get-vehicle.args";
import { Vehicle } from "./models/vehicle";
import { VehicleService } from "./vehicle.service";
import { request, gql } from 'graphql-request'
import { GetVehiclesArgs } from "./dto/args/get-vehicles.args";
import { DeleteUserInput } from "./dto/input/delete-user-input";
import { UpdateUserInput } from "./dto/input/update-user-input";
import { PaginateVehicle } from "./models/paginate-vehicle";

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

@Query(()=>[Vehicle],{nullable:true})
async searchVehicles(@Args('model')model:string){
  const query=gql`
  query{
    allVehicles(filter: {carModel: {startsWith: "${model}"}}) {
      nodes {
        ageOfVehicle
        carMake
        carModel
        email
        firstName
        id
        lastName
        manufacturedDate
        nodeId
        vinNumber
      }
    }
  }
  `
  const dataDetail= await request('http://localhost:5000/graphql',query)
console.log(dataDetail.allVehicles.nodes);
return dataDetail.allVehicles.nodes;
}

@Query(() => PaginateVehicle, { nullable: true })
async getVehicles (@Args('page')page:number=1){

  var offset:number;
  if(page==1){
    offset=0*100;
  }else{
    offset=page*100;
  }
  const query1=gql`
  query{
    allVehicles(offset: ${offset}, first: 100) {
      nodes {
        ageOfVehicle
        carMake
        carModel
        email
        firstName
        id
        lastName
        manufacturedDate
        nodeId
        vinNumber
      }
      totalCount
    }
  }
  
`;
const dataDetail= await request('http://localhost:5000/graphql',query1)
console.log(dataDetail.allVehicles);
const res:PaginateVehicle={
  vehicles:dataDetail.allVehicles.nodes,
  totalCount:dataDetail.allVehicles.totalCount
}
return res;
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
        {carMake:" ${updateVehicleData.carMake}",
        carModel: "${updateVehicleData.carModel}", 
        firstName: "${updateVehicleData.firstName}",
        email: "${updateVehicleData.email}",
        lastName: "${updateVehicleData.lastName}", 
        manufacturedDate: "${updateVehicleData.manufacturedDate}",
        vinNumber: "${updateVehicleData.vinNumber}"},
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
// console.log(updateQuery);
  const updatedData=await request('http://localhost:5000/graphql',updateQuery)
  console.log(updatedData.updateVehicleById.vehicle);
  return updatedData.updateVehicleById.vehicle;
}


}