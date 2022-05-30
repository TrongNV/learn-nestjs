import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import { CreateUserRequestDto, UserResponseSuccecssDto } from 'src/common/dtos/user/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/common/services/users/users.service';

@Controller()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UsersService) { }

  @ApiOperation({
    summary: 'Created user'
  })
  @ApiCreatedResponse({
    type: UserResponseSuccecssDto,
    description: 'Created user successfully '
  })
  @Public()
  @Post('user')
  async registerNewUser(@Body() user: CreateUserRequestDto): Promise<UserResponseSuccecssDto> {
    return this.userService.created(user);
  }
}
