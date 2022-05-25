import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


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

export class UserResponeValidateDto{
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    token: string;
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