import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/Guard/auth/jwt-auth.guard';
import { AuthService } from 'src/Services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiOperation({
    summary: 'Login user'
  })
  @ApiCreatedResponse({
    type: mongoose.Schema.Types.String,
    description: 'Login user successfully '
  })

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async loginAuth(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
