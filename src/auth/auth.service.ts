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

@Injectable()
export class AuthService {

  private readonly logger = new Logger(AuthService.name);

  constructor(
   @InjectModel(User.name) private userModel: Model<UserDocument>,
   private userService: UserService,
   private configService: ConfigService,
   private jwtService: JwtService,

  ) {}

  // async googleLogin(req: RequestWithUser): Promise<User> {
  //   try {
  //     if (!req.user) {
  //       throw new HttpException('No user from Google', HttpStatus.NOT_FOUND);
  //     }
  //
  //     const email = req.user.email
  //
  //     let user = await this.userModel.findOne({email})
  //
  //     if (!user) {
  //       const createUserDto: CreateUserDto = {
  //         email: email,
  //         firstName: req.user.firstName,
  //         lastName: req.user.lastName,
  //         accessToken: req.user.accessToken
  //       }
  //
  //       user = await this.userModel.create(createUserDto)
  //     }
  //
  //     return req.user
  //     // return user
  //   } catch (err) {
  //     console.log('! error = ', err);
  //     throw err
  //   }
  // }

  async signUp(reqBody: SignUpDto): Promise<{ success: boolean, token: string }> {
    try {

      const { firstName, lastName, email, password, type } = reqBody;

      const newUser: CreateUserDto = {
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

  private async generateToken(user: User): Promise<string> {
    // const payload = { name: user.name, phone: user.phone, id: user.id };
    // const payload: JwtPayload = { id: user.id };
    const payload: JwtPayload = { email: user.email };
    const secretKey: string = this.configService.get('PRIVATE_KEY') || 'SECRET';
    const expiresIn: string = '24h';

    const token: string = this.jwtService.sign(payload, { secret: secretKey, expiresIn });
    return token;
  }
}
