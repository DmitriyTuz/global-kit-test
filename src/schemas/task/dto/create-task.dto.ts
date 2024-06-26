import {ObjectId} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateTaskDto {
  @ApiProperty({ example: 'Task1', description: 'Task title' })
  @IsNotEmpty({ message: 'Task title required !' })
  @IsString({ message: 'Must be a string' })
  readonly title: string;

  @ApiProperty({ example: '667c87ef3490c6ec534d2df3', description: 'Project ID' })
  @IsNotEmpty({ message: 'Project ID required !' })
  readonly projectId: ObjectId;
}