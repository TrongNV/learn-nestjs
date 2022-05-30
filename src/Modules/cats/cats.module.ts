import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'src/Modules/cloudinary/cloudinary.module';
import { CatController } from 'src/Controllers/cats/cats.controller';
import { Cat, CatSchema } from 'src/schemas/cats/cat.schema';
import { CatService } from 'src/Services/cats/cat.service';
import { CatsTypeModule } from '../catstype/cats-type.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/Guard/roles/roles.guard';
import { JwtAuthGuard } from 'src/Guard/auth/jwt-auth.guard';
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