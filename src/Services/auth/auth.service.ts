import { Injectable } from '@nestjs/common';
import { UserResponeDto, UserResponeValidateDto } from 'src/Dtos/user/user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService) { }

  async validateUser(username: string, pass: string): Promise<UserResponeDto> {
    const user = await this.usersService.GetUserByUsername(username);

    if (user && user.password === pass) {
      const userNew = {
        username: user.username,
        token: user.token
      };

      return userNew;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}