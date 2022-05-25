import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import mongoose from 'mongoose';

@Controller('auth')
export class AuthController {

  @ApiOperation({
    summary: 'Login user'
  })
  @ApiCreatedResponse({
    type: mongoose.Schema.Types.String,
    description: 'Login user successfully '
  })
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async loginAuth(@Request() req): Promise<string> {

    return req.user;
  }

  
}
