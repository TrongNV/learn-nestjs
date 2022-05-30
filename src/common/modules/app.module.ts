import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { CatsTypeModule } from './catstype/cats-type.module';
import { CatsModule } from './cats/cats.module';
import { FileModule } from './files/file.module';
import { AuthModule } from '../../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersModule } from './users/users.module';
import { SendgirdMailModule } from './mail/mail.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      }
    }),
    SendgirdMailModule,
    PassportModule,
    CatsModule,
    CatsTypeModule,
    FileModule,
    AuthModule,
    UsersModule,
    SendgirdMailModule
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
