import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'src/Modules/cloudinary/cloudinary.module';
import { CatController } from 'src/Controllers/cats/cats.controller';
import { Cat, CatSchema } from 'src/schemas/cats/cat.schema';
import { CatService } from 'src/Services/cats/cat.service';
import { CatsTypeModule } from '../catstype/cats-type.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    CatsTypeModule,
    CloudinaryModule
  ],
  controllers: [CatController],
  providers: [CatService],
})
export class CatsModule { }