import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { CatsTypeController } from 'src/common/controllers/catstype/cats-type.controller';
import { RolesGuard } from 'src/common/guard/roles/roles.guard';
import { CatsType, CatsTypeSchema } from 'src/common/schemas';
import { CatsTypeService } from 'src/common/services/catstype/cats-type.service';

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