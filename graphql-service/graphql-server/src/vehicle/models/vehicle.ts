import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Vehicle {
    @Field(()=>Int)
    id: number;

    @Field()
    first_name: string;

    @Field()
    last_name: string;

    @Field()
    email:string;

    @Field()
    car_make:string;

    @Field()
    car_model:string;

    @Field()
    vin_number:string;

    @Field()
    manufactured_date: string;
    
  }