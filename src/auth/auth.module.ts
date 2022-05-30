import { Module } from '@nestjs/common';
import { UsersModule } from '../common/modules/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constants/constants';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/common/services/auth/auth.service';
import { LocalStrategy } from 'src/auth/strategy/local.strategy';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';

@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '7 days' },
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
