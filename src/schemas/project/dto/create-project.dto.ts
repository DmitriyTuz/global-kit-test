import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateProjectDto {
  @ApiProperty({ example: 'Project1', description: 'Project name' })
  @IsNotEmpty({ message: 'Project name required !' })
  @IsString({ message: 'Must be a string' })
  readonly name: string;
}