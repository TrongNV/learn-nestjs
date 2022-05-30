import { ApiProperty } from "@nestjs/swagger";

export class ImagesResponeDto{
    @ApiProperty()
    url: string;
}