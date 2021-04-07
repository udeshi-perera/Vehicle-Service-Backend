import { Args, Query, Resolver } from "@nestjs/graphql";
import { GetVehicleArgs } from "./dto/args/get-vehicle.args";
import { GetVehiclesArgs } from "./dto/args/get-vehicles.args";
import { Vehicle } from "./models/vehicle";
import { VehicleService } from "./vehicle.service";

@Resolver(()=>Vehicle)
export class VehiclesResolver {
  constructor(
    private readonly vehicleService: VehicleService
  ) {}

  @Query(()=>String)
  async hello() {
    return 'hello';
  }

//   @ResolveField()
//   async posts(@Parent() author: Author) {
//     const { id } = author;
//     return this.postsService.findAll({ authorId: id });
//   }

@Query(() => Vehicle, { name: 'vehicle', nullable: true })
 getVehicle(@Args() getVehicleArgs:GetVehicleArgs): Vehicle{
    return this.vehicleService.getVehicle(getVehicleArgs);
}

// @Query(() => [Vehicle], { name: 'users', nullable: true })
// getVehicles (@Args() getUsersArgs: GetVehiclesArgs): Vehicle[]{
//   return this.getVehicles(getUsersArgs);
// }
}