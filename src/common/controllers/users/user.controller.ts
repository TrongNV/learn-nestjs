import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import {
  CreateUserRequestDto,
  GetUserByUsernameParamsRequestDto,
  UserResponeDto,
  UserResponeValidateDto,
  UserResponseSuccecssDto,
} from 'src/common/dtos/user/user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/common/services/users/users.service';
import { Role, Roles } from 'src/common/decorator/roles.decorator';

@ApiTags('user')
@ApiBearerAuth()
@Controller()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UsersService) {}

  @ApiOperation({
    summary: 'Created user',
  })
  @ApiCreatedResponse({
    type: UserResponseSuccecssDto,
    description: 'Created user successfully ',
  })
  @Public()
  @Post('user')
  async registerNewUser(
    @Body() user: CreateUserRequestDto,
  ): Promise<UserResponseSuccecssDto> {
    return this.userService.created(user);
  }

  @ApiOperation({
    summary: 'Created mutiple user',
  })
  @ApiCreatedResponse({
    type: UserResponseSuccecssDto,
    description: 'Created mutiple user successfully ',
  })
  @Roles(Role.Admin)
  @Post('user/mutiple')
  async createMutipleUser(): Promise<UserResponseSuccecssDto> {
    return this.userService.createMutipleUser();
  }

  @ApiOperation({
    summary: 'Get all user',
  })
  @ApiCreatedResponse({
    type: [UserResponeDto],
    description: 'Get all user successfully ',
  })
  @Roles(Role.Admin)
  @Post('users')
  async GetUsers(): Promise<UserResponeDto[]> {
    return this.userService.GetUsers();
  }

  @ApiOperation({
    summary: 'Get user of username',
  })
  @ApiCreatedResponse({
    type: [UserResponeValidateDto],
    description: 'Get user of username successfully ',
  })
  @Roles(Role.Admin)
  @Get('user/:username')
  async GetUserByUsername(
    @Param() params: GetUserByUsernameParamsRequestDto,
  ): Promise<UserResponeValidateDto> {
    return this.userService.GetUserByUsername(params.username);
  }
}
