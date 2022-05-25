import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from '../Controllers/app.controller';
import { AppService } from '../Services/app.service';
import { CatsTypeModule } from './catstype/cats-type.module';
import { CatsModule } from './cats/cats.module';
import { FileModule } from './files/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    CatsModule,
    CatsTypeModule,
    FileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
