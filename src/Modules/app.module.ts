import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from '../Controllers/app.controller';
import { AppService } from '../Services/app.service';
import { CatsTypeModule } from './catstype/cats-type.module';
import { CatsModule } from './cats/cats.module';
import { FileModule } from './files/file.module';
import { AuthModule } from './auth/auth.module';
import { LocalStrategy } from 'src/Strategy/auth/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/Guard/auth/jwt-auth.guard';
import { JwtStrategy } from 'src/Strategy/auth/jwt.strategy';
import { LocalAuthGuard } from 'src/Guard/auth/local-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    PassportModule,
    CatsModule,
    CatsTypeModule,
    FileModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, 
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule {}
