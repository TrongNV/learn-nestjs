import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UserAuthRequestDto, UserRequestDto, UserResponeDto, UserResponeValidateDto } from 'src/Dtos/user/user.dto';
import { User, UserDocument } from 'src/schemas/user/user.schema';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>
  ) { }

  async GetUserByUsername(username: string): Promise<UserResponeValidateDto> {

    const user = await this.usersModel.findOne({ username: username });

    return user;
  }

  async UpdateTokenUserById(userId: ObjectId, user: UserRequestDto): Promise<UserResponeDto> {

    const newUser = await this.usersModel.findOneAndUpdate({ _id: userId }, user, {
      new: true
    });

    return newUser;
  }
}