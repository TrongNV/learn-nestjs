import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatResponeDto } from 'src/Dtos';
import { CatsTypeResponeDto, CreateCatsTypeRequestDto, GetCatsTypeIdParamsRequestDto, DeletedCatsTypeIdParamsRequestDto } from 'src/Dtos/catsType';
import { CatsType, CatsTypeDocument } from 'src/schemas/catstype/cats-type.schema';

@Injectable()
export class CatsTypeService {
  constructor(@InjectModel(CatsType.name) private catsTypeModel: Model<CatsTypeDocument>) { }

  responseError(){
    throw new HttpException(
      {
        message: 'CatsType not exist',
      },
      HttpStatus.BAD_REQUEST
    );
  }


  async getAllCatsType(): Promise<CatsTypeResponeDto[]> {
    return this.catsTypeModel.find();
  }

  async getCatsTypeId(params: GetCatsTypeIdParamsRequestDto): Promise<CatsTypeResponeDto> {

    const { catsTypeId } = params

    const catsType = await this.catsTypeModel.findById({
      _id: catsTypeId
    });

    if (!catsType) {
      this.responseError();
    }
    return catsType;
  }

  async create(body: CreateCatsTypeRequestDto): Promise<CatsTypeResponeDto> {
    return this.catsTypeModel.create(body);
  }

  async update(params: GetCatsTypeIdParamsRequestDto, body: CreateCatsTypeRequestDto): Promise<CatsTypeResponeDto> {
    const { catsTypeId } = params;

    const catsType = await this.catsTypeModel.findById(catsTypeId);
    if (!catsType) {
      throw new HttpException(
        {
          message: 'catsType not exist',
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const updatedCatsType = await this.catsTypeModel.findOneAndUpdate({ _id: catsTypeId }, body, {
      new: true
    });

    return updatedCatsType;
  }

  async delete(params: GetCatsTypeIdParamsRequestDto): Promise<DeletedCatsTypeIdParamsRequestDto> {
    const { catsTypeId } = params;
    const catsType = await this.catsTypeModel.findById({ _id: catsTypeId });
    if (!catsType) {
      throw new HttpException(
        {
          message: 'CatsType not exist',
        },
        HttpStatus.BAD_REQUEST
      );
    }

    await this.catsTypeModel.deleteOne({
      _id: catsTypeId
    })

    return {
      isSuccess: true
    }
  }
}