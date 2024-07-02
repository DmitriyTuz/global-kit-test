import {HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import {User, UserDocument} from "@src/schemas/user/user.schema";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {SignUpDto} from "@src/auth/dto/sign-up.dto";
import {UserService} from "@src/schemas/user/user.service";
import {JwtPayload} from "@src/interfaces/jwt-payload.interface";
import {ConfigService} from "@nestjs/config";
import { JwtService } from '@nestjs/jwt';
import {LoginDto} from "@src/auth/dto/login.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

  constructor(
   @InjectModel(User.name) private userModel: Model<UserDocument>,
   private userService: UserService,
   private configService: ConfigService,
   private jwtService: JwtService,

  ) {}

  async signUp(reqBody: SignUpDto): Promise<{ success: boolean, token: string }> {

    const { firstName, lastName, email, password, type } = reqBody;

    const newUser: SignUpDto = {
      firstName,
      lastName,
      email,
      password,
      type
    }

    const user = await this.userService.createUser(newUser);
    const token: string = await this.generateToken(user);

    return { success: true, token: token };

  }

  async login(reqBody: LoginDto): Promise<{ success: boolean, token: string }> {
    const user: User = await this.validateUser(reqBody);
    const token: string = await this.generateToken(user);

    return { success: true, token: token };
  }

  private async generateToken(user: User): Promise<string> {
    const payload: JwtPayload = { email: user.email };
    const secretKey: string = this.configService.get('PRIVATE_KEY') || 'SECRET';
    const expiresIn: string = '24h';

    const token: string = this.jwtService.sign(payload, { secret: secretKey, expiresIn });
    return token;
  }

  private async validateUser(dto: LoginDto): Promise<User> {
    const user: User | undefined = await this.userService.getOneByEmail(dto.email);

    if (user) {
      const passwordEquals: boolean = await bcrypt.compare(dto.password, user.password);

      if (passwordEquals) {
        return user;
      }
    }
    throw new HttpException('Incorrect email or password', HttpStatus.UNAUTHORIZED);
  }

}
