import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class EmailRequestDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;
}

