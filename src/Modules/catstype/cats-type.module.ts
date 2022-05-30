import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { CatsTypeController } from 'src/Controllers/catstype/cats-type.controller';
import { RolesGuard } from 'src/Guard/roles/roles.guard';
import { CatsType, CatsTypeSchema } from 'src/schemas';
import { CatsTypeService } from 'src/Services/catstype/cats-type.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CatsType.name, schema: CatsTypeSchema }]),
    PassportModule
  ],
  controllers: [CatsTypeController],
  providers: [CatsTypeService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
  exports: [CatsTypeService]
})
export class CatsTypeModule { }