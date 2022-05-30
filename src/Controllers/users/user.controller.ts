import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Public } from 'src/Decorator/public.decorator';
import { CreateUserRequestDto } from 'src/Dtos/user/user.dto';
import { JwtAuthGuard } from 'src/Guard/auth/jwt-auth.guard';
import { UsersService } from 'src/Services/users/users.service';

@Controller()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UsersService) { }

  @ApiOperation({
    summary: 'Login user'
  })
  @ApiCreatedResponse({
    type: mongoose.Schema.Types.String,
    description: 'Login user successfully '
  })
  @Public()
  @Post('user')
  async registerNewUser(@Body() user: CreateUserRequestDto): Promise<any> {
    return this.userService.created(user);
  }
}
