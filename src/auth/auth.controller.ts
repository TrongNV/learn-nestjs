import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import { UserResponseTokenDto } from 'src/common/dtos/user/user.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/common/services/auth/auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiOperation({
    summary: 'Login user'
  })
  @ApiCreatedResponse({
    type: UserResponseTokenDto,
    description: 'Login user successfully '
  })
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  async loginAuth(@Request() req): Promise<UserResponseTokenDto> {
    return this.authService.login(req.user);
  }

  // @Get('profile')
  // @UseGuards(JwtAuthGuard)
  // getProfile(@Request() req) {
    
  //   return req.user;
  // }
}
