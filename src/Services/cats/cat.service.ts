import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

// import fs from 'fs'

// fs.createWriteStream('path').write('buffer')

//schemas
import { Cat, CatDocument } from 'src/schemas';

//sevices
import { CatsTypeService } from '../catstype/cats-type.service';
import { CloudinaryService } from 'src/Services/cloudinary/cloudinary.service';


//dtos
import { DeletedCatReponseDto, GetCatsTypeIdParamsRequestDto, CatResponeDto, CreateCatRequestDto, UpdateCatRequestDto, UploadImageCatReponseDto } from 'src/Dtos';

@Injectable()
export class CatService {
  constructor(
    @InjectModel(Cat.name) private catModel: Model<CatDocument>,

    private readonly catsTypeServices: CatsTypeService,
    private cloudinary: CloudinaryService
  ) { }

  async getCats(): Promise<CatResponeDto[]> {
    return this.catModel.find();
  }

  async getCatById(catId: string): Promise<CatResponeDto> {
    const cat = await this.catModel.findOne({ _id: catId });
    if (!cat) {
      this.throwErrorCatNotExist();
    }

    return cat;
  }

  async create(body: CreateCatRequestDto): Promise<CatResponeDto> {
    return this.catModel.create(body);
  }

  async delete(catId: ObjectId): Promise<DeletedCatReponseDto> {
    const cat = await this.catModel.findById({ _id: catId });
    if (!cat) {
      this.throwErrorCatNotExist();
    }

    await this.catModel.deleteOne({
      _id: catId
    })

    return {
      isSuccess: true
    }
  }

  async getCatsOnCatsTypeId(params: GetCatsTypeIdParamsRequestDto): Promise<CatResponeDto[]> {
    const { catsTypeId } = params;

    await this.catsTypeServices.getCatsTypeId({ catsTypeId });

    const cats = await this.catModel.find({
      catsTypeId
    });
    if (!cats) {
      this.throwErrorCatNotExist();
    }

    return cats;
  }

  async update(catId: ObjectId, body: UpdateCatRequestDto): Promise<CatResponeDto> {
    const cat = await this.catModel.findById(catId);
    if (!cat) {
      this.throwErrorCatNotExist();
    }

    const updatedCat = await this.catModel.findOneAndUpdate({ _id: catId }, body, {
      new: true
    });

    return updatedCat;
  }

  throwErrorCatNotExist() {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Cats not exist'
      },
      HttpStatus.BAD_REQUEST
    );
  }
}
