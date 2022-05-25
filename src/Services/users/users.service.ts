import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserResponeDto, UserResponeValidateDto } from 'src/Dtos/user/user.dto';
import { User, UserDocument } from 'src/schemas/user/user.schema';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>
  ) { }

  async GetUserByUsername(username: string): Promise<UserResponeValidateDto> {

    const user = await this.usersModel.findOne({username: username});

    return user;
  }
  
}