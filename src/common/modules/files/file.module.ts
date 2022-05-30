import { Module } from '@nestjs/common';
import { CloudinaryModule } from 'src/common/modules/cloudinary/cloudinary.module';
import { FileController } from 'src/common/controllers/files/file.controller';
import { FileService } from 'src/common/services/files/file.service'

@Module({
  imports: [CloudinaryModule],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule { }