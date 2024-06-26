// import { ApiProperty } from '@nestjs/swagger';
// import { IsNotEmpty, IsString, Length, Validate } from 'class-validator';
//
//
// export class LoginDto {
//   @ApiProperty({ example: '+100000000001', description: 'Phone' })
//   @IsNotEmpty({ message: 'Phone required !' })
//   @IsString({ message: 'Must be a string' })
//   @Validate(IsPhone, { message: 'Phone number is not correct, please type full phone number with country code' })
//   readonly phone: string;
//
//   @ApiProperty({ example: '12345678', description: 'Password' })
//   @IsNotEmpty({ message: 'Password required !' })
//   @IsString({ message: 'Must be a string' })
//   @Length(4, 16, { message: 'Must be between 4 and 16' })
//   readonly password: string;
// }
