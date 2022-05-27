import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/Decorator/public.decorator';
import { Role, Roles } from 'src/Decorator/roles.decorator';
import { GetCatsTypeIdParamsRequestDto, UpdateCatsTypeRequestDto, CatsTypeResponeDto, CreateCatsTypeRequestDto, DeletedCatsTypeIdParamsRequestDto, CatResponeDto } from 'src/Dtos';
import { JwtAuthGuard } from 'src/Guard/auth/jwt-auth.guard';
import { CatsTypeService } from 'src/Services/catstype/cats-type.service';

@Controller('catstype')
export class CatsTypeController {
  constructor(private readonly catsTypeService: CatsTypeService) { }


  @ApiOperation({
    summary: 'Get all catstype'
  })
  @ApiOkResponse({
    type: CatsTypeResponeDto,
    description: 'Get all catstype successfully '
  })
  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async getAllCatsType(): Promise<CatsTypeResponeDto[]> {
    return this.catsTypeService.getAllCatsType();
  }

  @ApiOperation({
    summary: 'Get catstType by id'
  })
  @ApiOkResponse({
    type: CatsTypeResponeDto,
    description: 'Get catstType by id successfully '
  })
  @Get(':catsTypeId')
  async getCatsTypeId(@Param() params: GetCatsTypeIdParamsRequestDto): Promise<CatsTypeResponeDto> {
    return this.catsTypeService.getCatsTypeId(params);
  }

  @ApiOperation({
    summary: 'Create catstType'
  })
  @ApiCreatedResponse({
    type: CatsTypeResponeDto,
    description: 'Create catstType successfully '
  })
  @Post()
  async create(@Body() body: CreateCatsTypeRequestDto): Promise<CatsTypeResponeDto> {
    return this.catsTypeService.create(body);
  }

  @ApiOperation({
    summary: 'Update catstType by id'
  })
  @ApiCreatedResponse({
    type: CatsTypeResponeDto,
    description: 'Update catstType by id successfully '
  })
  @Put(':catsTypeId')
  async update(@Param() params: GetCatsTypeIdParamsRequestDto, @Body() body: UpdateCatsTypeRequestDto): Promise<CatsTypeResponeDto> {
    return this.catsTypeService.update(params, body);
  }

  @ApiOperation({
    summary: 'Deleted catstType by id'
  })
  @ApiOkResponse({
    type: DeletedCatsTypeIdParamsRequestDto,
    description: 'Deleted catstType by id successfully '
  })
  @Delete(':catsTypeId')
  async delete(@Param() params: GetCatsTypeIdParamsRequestDto): Promise<DeletedCatsTypeIdParamsRequestDto> {
    return this.catsTypeService.delete(params);
  }
}
