import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export enum Gender {
    MALE = "male",
    FEMALE = "female"
}

export class CreateCatRequestDto {
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
export class UpdateCatRequestDto {
    @IsString()
    @IsOptional()
    @ApiProperty({
        required: false
    })
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    urlImage: string

    @IsEnum(Gender)
    @IsOptional()
    @ApiProperty({
        required: false
    })
    gender: Gender

    @IsString()
    @IsOptional()
    @IsMongoId()
    @ApiProperty({
        required: false
    })
    catsTypeId: ObjectId
}
export class CatResponeDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    urlImage: string

    @ApiProperty()
    gender: Gender

    @ApiProperty()
    catsTypeId: ObjectId
}

export class GetCatByIdParamsRequestDto {
    @IsMongoId()
    @IsNotEmpty()
    @ApiProperty()
    catId: string
}

export class GetCatIdAndCatsTypeIdParamsRequestDto {
    @IsMongoId()
    @IsNotEmpty()
    @ApiProperty()
    catId: string

    @IsMongoId()
    @IsNotEmpty()
    @ApiProperty()
    catsTypeId: string
}

export class GetCatByStoreParamRequestDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    storeId: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    catId: string
}

export class DeletedCatReponseDto {
    @ApiProperty()
    isSuccess: boolean
}

export class UploadImageCatReponseDto {
    @ApiProperty()
    url: string
}