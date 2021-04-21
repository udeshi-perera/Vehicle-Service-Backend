import { ArgsType, Field, Int } from "@nestjs/graphql";
import { IsArray } from "class-validator";

@ArgsType()
export class GetVehiclesArgs{

    @Field(()=>Int)
    @IsArray()
    ids: string[];
}