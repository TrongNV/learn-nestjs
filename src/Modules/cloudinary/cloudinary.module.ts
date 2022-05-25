import { Module } from '@nestjs/common';
import { CloudinaryProvider } from '../../Providers/cloudinary.provider';
import { CloudinaryService } from '../../Services/cloudinary/cloudinary.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}