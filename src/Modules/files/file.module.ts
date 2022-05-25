import { Module } from '@nestjs/common';
import { CloudinaryModule } from 'src/Modules/cloudinary/cloudinary.module';
import { FileController } from 'src/Controllers/files/file.controller';
import { FileService } from 'src/Services/files/file.service'

@Module({
  imports: [CloudinaryModule],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule { }