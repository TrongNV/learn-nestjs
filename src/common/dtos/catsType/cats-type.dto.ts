import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateCatsTypeRequestDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;
}

export class UpdateCatsTypeRequestDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;
}

export class GetCatsTypeIdParamsRequestDto{
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    @ApiProperty()
    catsTypeId: string
}

export class CatsTypeResponeDto{
    @ApiProperty()
    name: string;
}

export class DeletedCatsTypeIdParamsRequestDto{
    @ApiProperty()
    isSuccess: boolean
}

