import {HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
// import { RequestWithUser } from '@src/interfaces/add-field-user-to-Request.interface';
import {User, UserDocument} from "@src/schemas/user/user.schema";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {CreateUserDto} from "@src/schemas/user/dto/create-user.dto";
import {SignUpDto} from "@src/auth/dto/sign-up.dto";
import {UserService} from "@src/schemas/user/user.service";
import {CustomHttpException} from "@src/exceptions/сustomHttp.exception";
import {JwtPayload} from "@src/interfaces/jwt-payload.interface";
import {ConfigService} from "@nestjs/config";
import { JwtService } from '@nestjs/jwt';
import {LoginDto} from "@src/auth/dto/login.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

  private readonly logger = new Logger(AuthService.name);

  constructor(
   @InjectModel(User.name) private userModel: Model<UserDocument>,
   private userService: UserService,
   private configService: ConfigService,
   private jwtService: JwtService,

  ) {}

  async signUp(reqBody: SignUpDto): Promise<{ success: boolean, token: string }> {
    try {

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

    } catch (e) {
      this.logger.error(`Error during user signUp: ${e.message}`);
      throw new CustomHttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY, [e.message], new Error().stack);
    }
  }

  async login(reqBody: LoginDto): Promise<{ success: boolean, token: string }> {
    try {
      const user: User = await this.validateUser(reqBody);
      const token: string = await this.generateToken(user);

      return { success: true, token: token };

    } catch (e) {
      this.logger.error(`Error during user login: ${e.message}`);
      throw new CustomHttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY, [e.message], new Error().stack);
    }
  }

  private async generateToken(user: User): Promise<string> {
    // const payload = { name: user.name, phone: user.phone, id: user.id };
    // const payload: JwtPayload = { id: user.id };
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
