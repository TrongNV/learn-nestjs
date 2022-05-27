import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto, UserAuthRequestDto, UserRequestDto, UserResponeDto, UserResponeValidateDto, UserResponeValidateLoginDto } from 'src/Dtos/user/user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, pass: string): Promise<UserResponeValidateLoginDto> {
    const user = await this.usersService.GetUserByUsername(username);
    
    if (user && user.password === pass) {
      
      return {
        _id: user._id,
        username: user.username,
        roles: user.roles
      };
    }

    return null;
  }

  async login(user: UserRequestDto) {
    
    const payload = { username: user.username, _id: user._id, roles: user.roles };

    const accessToken = this.jwtService.sign(payload);

    user.token = accessToken;
    const updatedTokenUser = await this.usersService.UpdateTokenUserById(user._id, user);

    return {
      access_token: updatedTokenUser.token,
    };
  }
}