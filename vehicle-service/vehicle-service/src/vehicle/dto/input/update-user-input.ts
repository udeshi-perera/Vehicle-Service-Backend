import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class UpdateUserInput {
    @Field(()=>Int)
    @IsNotEmpty()
    id: string;

    @Field({ nullable: true })
    @IsOptional()
    firstName?: string;

    @Field({ nullable: true })
    @IsOptional()
    lastName?: string

    @Field({ nullable: true })
    @IsOptional()
    email?: string

    @Field({ nullable: true })
    @IsOptional()
    carMake?: string

    @Field({ nullable: true })
    @IsOptional()
    carModel?: string

    @Field({ nullable: true })
    @IsOptional()
    vinNumber?: string

    @Field({ nullable: true })
    @IsOptional()
    manufacturedDate?: string
}