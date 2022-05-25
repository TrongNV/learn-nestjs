import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsTypeController } from 'src/Controllers/catstype/cats-type.controller';
import { CatsType, CatsTypeSchema } from 'src/schemas';
import { CatsTypeService } from 'src/Services/catstype/cats-type.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: CatsType.name, schema: CatsTypeSchema }])],
  controllers: [CatsTypeController],
  providers: [CatsTypeService],
  exports: [CatsTypeService]
})
export class CatsTypeModule {}