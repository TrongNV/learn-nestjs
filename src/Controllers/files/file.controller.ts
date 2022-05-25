import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ImagesResponeDto } from 'src/Dtos/file/file.dto';
import { FileService } from 'src/Services/files/file.service';

@Controller('images')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @ApiOperation({
    summary: 'Create images'
  })
  @ApiCreatedResponse({
    type: ImagesResponeDto,
    description: 'Create images successfully '
  })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadImages(@UploadedFile() file: Express.Multer.File): Promise<ImagesResponeDto> {
    return this.fileService.uploadImagesCat(file);
  }
}
