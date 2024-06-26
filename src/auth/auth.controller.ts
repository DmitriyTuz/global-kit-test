import {Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@src/auth/auth.service';
// import { RequestWithUser } from '@src/interfaces/add-field-user-to-Request.interface';
import {SignUpDto} from "@src/auth/dto/sign-up.dto";
import {ApiBearerAuth, ApiBody, ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @ApiOperation({ summary: 'Sign up' })
  @ApiBody({ type: SignUpDto, description: 'Sign up data' })
  @ApiResponse({ status: 201, description: 'User has been successfully registered' })
  @ApiResponse({ status: 400, description: 'Unable to register user' })
  @ApiBearerAuth('JWT')
  @UsePipes(ValidationPipe)
  async signUp(@Body() reqBody: SignUpDto) {
   return await this.authService.signUp(reqBody);
  }



}
