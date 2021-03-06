import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ObjectId } from "mongoose";
import { Role, Roles } from "src/common/decorator/roles.decorator";
import { CatResponeDto, CreateCatRequestDto, DeletedCatReponseDto, GetCatByIdParamsRequestDto, GetCatsTypeIdParamsRequestDto, UpdateCatRequestDto, UploadImageCatReponseDto } from "src/common/dtos";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CatService } from "src/common/services/cats/cat.service";

@ApiTags('cats')
@ApiBearerAuth()
@Controller('cats')
@UseGuards(JwtAuthGuard)
export class CatController {
    constructor(private readonly catService: CatService) { }
    
    @ApiOperation({
        summary: 'Get cats'
    })
    @ApiOkResponse({
        type: [CatResponeDto],
        description: 'Get cats successfully'
    })
    @Get()
    @Roles(Role.Admin)
    async getCats(): Promise<CatResponeDto[]> {
        return this.catService.getCats();
    }

    @ApiOperation({
        summary: 'Get cat by id'
    })
    @ApiOkResponse({
        type: CatResponeDto,
        description: 'Get cat by id successfully '
    })
    @Get(':catId')
    async getCat(@Param() params: GetCatByIdParamsRequestDto): Promise<CatResponeDto> {
        return this.catService.getCatById(params.catId);
    }

    @ApiOperation({
        summary: 'Get cats by catsTypeId'
    })
    @ApiOkResponse({
        type: CatResponeDto,
        description: 'Get cats by catsTypeId successfully '
    })
    @Get('catstype/:catsTypeId')
    async getCatsOnCatsTypeId(@Param() params: GetCatsTypeIdParamsRequestDto): Promise<CatResponeDto[]> {
        return this.catService.getCatsOnCatsTypeId(params);
    }

    @ApiOperation({
        summary: 'Create cat'
    })
    @ApiCreatedResponse({
        type: CatResponeDto,
        description: 'Create cat successfully '
    })
    @Post()
    async create(@Body() body: CreateCatRequestDto): Promise<CatResponeDto> {
        return this.catService.create(body);
    }

    @ApiOperation({
        summary: 'Update cat'
    })
    @ApiCreatedResponse({
        type: CatResponeDto,
        description: 'Update cat successfully '
    })
    @Put(':catId')
    async update(@Param('catId') catId: ObjectId, @Body() body: UpdateCatRequestDto): Promise<CatResponeDto> {
        return this.catService.update(catId, body);
    }

    @ApiOperation({
        summary: 'Update cat'
    })
    @ApiOkResponse({
        type: DeletedCatReponseDto,
        description: 'Update cat successfully '
    })
    @Delete(':catId')
    async delete(@Param('catId') catId: ObjectId): Promise<DeletedCatReponseDto> {
        return this.catService.delete(catId);
    }
}