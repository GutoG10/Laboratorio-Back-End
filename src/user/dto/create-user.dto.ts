import { IsEmail, IsNotEmpty, IsString, IsUUID, MinLength } from "class-validator";
import { Generated } from "typeorm";

export class CreateUserDTO {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}