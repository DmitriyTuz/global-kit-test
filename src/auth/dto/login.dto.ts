import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString, Length, Validate} from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: "email@gmail.com", description: "User email" })
  @IsString({ message: "Must be a string" })
  @IsEmail({}, { message: "Incorrect email" })
  readonly email: string;

  @ApiProperty({ example: '1234567', description: 'Password' })
  @IsNotEmpty({ message: 'Password required !' })
  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'Must be between 4 and 16' })
  readonly password: string;
}
