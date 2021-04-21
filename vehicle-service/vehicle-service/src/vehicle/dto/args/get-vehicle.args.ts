import { ArgsType, Field, Int } from "@nestjs/graphql";

@ArgsType()
export class GetVehicleArgs{

    @Field(()=>Int)
    id: number;
}