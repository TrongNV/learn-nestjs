import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongoose";


export class CreateUserRequestDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string
}

export class UserAuthRequestDto {
    

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string
}

export class UserRequestDto {
    @IsMongoId()
    @IsOptional()
    @ApiProperty()
    _id: ObjectId
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    token: string
}

export class UserResponeValidateDto{

    @ApiProperty()
    _id: ObjectId;

    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    role: string;
}

export class UserResponeDto{
    @ApiProperty()
    username: string;

    @ApiProperty()
    token: string;
}

export class UserLoginRequestDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;
}