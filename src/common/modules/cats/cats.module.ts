import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'src/common/modules/cloudinary/cloudinary.module';
import { CatController } from 'src/common/controllers/cats/cats.controller';
import { Cat, CatSchema } from 'src/common/schemas/cats/cat.schema';
import { CatService } from 'src/common/services/cats/cat.service';
import { CatsTypeModule } from '../catstype/cats-type.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guard/roles/roles.guard';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    PassportModule,
    CatsTypeModule,
    CloudinaryModule
  ],
  controllers: [CatController],
  providers: [CatService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class CatsModule { }