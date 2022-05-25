import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/Services/cloudinary/cloudinary.service';
import { ImagesResponeDto } from 'src/Dtos/file/file.dto';

@Injectable()
export class FileService {
  constructor(
    private cloudinary: CloudinaryService
  ) { }

  async uploadImagesCat(file: Express.Multer.File): Promise<ImagesResponeDto>{

    if (!file) {
      this.throwErrorImagesCatExist();
    }

    const upload = await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });

    return {
      url: upload.url
    };
  }

  throwErrorImagesCatExist() {
    throw new HttpException(
      {
        message: 'Images cat not exist'
      },
      HttpStatus.BAD_REQUEST
    );
  }
}