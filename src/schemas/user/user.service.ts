import {HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import {User, UserDocument} from "@src/schemas/user/user.schema";
import {Model, ObjectId} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {CreateUserDto} from "@src/schemas/user/dto/create-user.dto";
// import {CustomHttpException} from "@src/exceptions/сustomHttp.exception";

import * as bcrypt from 'bcryptjs';
import {FoundUserException} from "@src/exceptions/found-user-exception.exception";

@Injectable()
export class UserService {

  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,) {}

  async getOne(id: ObjectId): Promise<User> {
    return this.userModel.findById(id);
  }

  async getOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({email});
  }

  async createUser(dto: CreateUserDto): Promise <User> {
    let {email} = dto;

    const currentUser: User = await this.getOneByEmail(email);
    if (currentUser) {

      // throw new FoundUserException({code: 'error'});

      throw new HttpException(
          {
            message: `User with email ${currentUser.email} already exists`,
            error: 'Our error',
            status: HttpStatus.FOUND
          }, HttpStatus.FOUND);

      // throw new HttpException(`User with email ${currentUser.email} already exists`, HttpStatus.FOUND);
    }

    let password: string = dto.password;

    const hashPassword: string = await bcrypt.hash(password, 5);

    const newUser: CreateUserDto = {
      ...dto,
      password: hashPassword,
    };

    let user: User = await this.userModel.create(newUser);

    this.logger.log(`User created: ${user.firstName} ${user.lastName}`);

    return user;
  }
}
