import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ImagesResponeDto } from 'src/common/dtos/file/file.dto';
import { FileService } from 'src/common/services/files/file.service';

@ApiTags('images')
@ApiBearerAuth()
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
