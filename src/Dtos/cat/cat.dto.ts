import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongoose";
import { Gender } from "./create-cat.dto";

export class CatDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    urlImage: string

    @IsEnum(Gender)
    @IsNotEmpty()
    @ApiProperty()
    gender: Gender

    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    @ApiProperty()
    catsTypeId: ObjectId
}