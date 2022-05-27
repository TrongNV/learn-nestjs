import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongoose";
import { Role } from "src/Decorator/roles.decorator";


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

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    roles: Role[];
}

export class UserResponeValidateDto{

    @ApiProperty()
    _id: ObjectId;

    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    roles: Role[];
}

export class UserResponeValidateLoginDto{

    @ApiProperty()
    _id: ObjectId;

    @ApiProperty()
    username: string;

    @ApiProperty()
    roles: Role[];
}

export class UserResponeDto{

    @ApiProperty()
    _id: ObjectId;

    @ApiProperty()
    username: string;

    @ApiProperty()
    token: string;

    @ApiProperty()
    roles: Role[];
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