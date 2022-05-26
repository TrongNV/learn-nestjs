import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/Strategy/auth/local.strategy';
import { AuthService } from 'src/Services/auth/auth.service';
import { AuthController } from 'src/Controllers/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/Constants/constants';
import { JwtStrategy } from 'src/Strategy/auth/jwt.strategy';

@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
