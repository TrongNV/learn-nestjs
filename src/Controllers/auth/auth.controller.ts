import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Public } from 'src/Decorator/public.decorator';
import { JwtAuthGuard } from 'src/Guard/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/Guard/auth/local-auth.guard';
import { AuthService } from 'src/Services/auth/auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiOperation({
    summary: 'Login user'
  })
  @ApiCreatedResponse({
    type: mongoose.Schema.Types.String,
    description: 'Login user successfully '
  })

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  async loginAuth(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    
    return req.user;
  }
}
