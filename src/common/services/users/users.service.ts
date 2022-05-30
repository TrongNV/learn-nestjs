import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt = require("bcryptjs");
import { Model, ObjectId } from 'mongoose';
import { CreateUserRequestDto, UserRequestDto, UserResponeDto, UserResponeValidateDto, UserResponseSuccecssDto } from 'src/common/dtos/user/user.dto';
import { User, UserDocument } from 'src/common/schemas/user/user.schema';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
  ) { }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async comparePassword(
    password: string,
    storePasswordHash: string,
  ): Promise<any> {
    
    return await bcrypt.compare(password, storePasswordHash);
  }

  async created(user: CreateUserRequestDto): Promise<UserResponseSuccecssDto> {


    user.password = await this.hashPassword(user.password);

    const userIsExist =  await this.usersModel.findOne({username: user.username});
    if(userIsExist){
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'The username is valid'
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const createdUser =  await this.usersModel.create(user);
    if(!createdUser){
      return {
        isSuccess: false
      };
    }
    return {
      isSuccess: true
    };
  }

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