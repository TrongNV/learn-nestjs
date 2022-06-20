import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  isString,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongoose';
import { Role } from 'src/common/decorator/roles.decorator';

export class CreateUserRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
export class UserResponseSuccecssDto {
  @ApiProperty()
  isSuccess: boolean;
}

export class UserResponseTokenDto {
  @ApiProperty()
  access_token: string;
}

export class UserAuthRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}

export class UpdateUserRequestDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  customerId?: string;

  @IsString()
  @IsOptional()
  subId?: string;
}

export class UserRequestDto {
  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  _id: ObjectId;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  token: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  roles: Role[];
}

export class GetUserByUsernameParamsRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;
}

export class UserResponeValidateDto {
  @ApiProperty()
  _id: ObjectId;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  roles: Role[];
}

export class UserResponeValidateLoginDto {
  @ApiProperty()
  _id: ObjectId;

  @ApiProperty()
  username: string;

  @ApiProperty()
  roles: Role[];
}

export class UserResponeDto {
  @ApiProperty()
  _id: ObjectId;

  @ApiProperty()
  username: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  roles: Role[];
}

export class UserLoginRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
