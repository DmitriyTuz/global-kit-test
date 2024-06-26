import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString, Length, Validate} from 'class-validator';

export class SignUpDto {

  @ApiProperty({ example: 'FirstName1', description: 'User first name' })
  @IsNotEmpty({ message: 'User first name required !' })
  @IsString({ message: 'Must be a string' })
  @Length(3, 256, { message: 'Must be at least 2 characters' })
  readonly firstName: string;

  @ApiProperty({ example: 'FirstName1', description: 'User first name' })
  @IsNotEmpty({ message: 'User first name required !' })
  @IsString({ message: 'Must be a string' })
  @Length(3, 256, { message: 'Must be at least 2 characters' })
  readonly lastName: string;

  @ApiProperty({ example: "user@gmail.com", description: "email" })
  @IsString({ message: "Must be a string" })
  @IsEmail({}, { message: "Incorrect email" })
  readonly email: string;

  @ApiProperty({ example: '1234567', description: 'User password' })
  @IsNotEmpty({ message: 'Password required !' })
  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'Must be between 4 and 16' })
  readonly password: string;

  @ApiProperty({ example: 'ADMIN', description: 'User role' })
  @IsNotEmpty({ message: 'User role required !' })
  @IsString({ message: 'Must be a string' })
  readonly type: string;
}