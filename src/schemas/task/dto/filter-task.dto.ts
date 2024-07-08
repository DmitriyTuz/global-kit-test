import {ObjectId} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";
import {TaskStatus} from "@src/schemas/task/task.schema";

export enum SortOrder {
  asc = 'asc',
  desc = 'desc'
}

export enum SortTaskBy {
  createdAt = 'createdAt',
  projectId = 'projectId',
  status = 'status'
}

export class FilterTaskDto {
  @ApiProperty({ example: '667c87ef3490c6ec534d2df3', description: 'Project ID' })
  @IsNotEmpty({ message: 'Project ID required !' })
  readonly projectId: ObjectId;

  @ApiProperty({ example: TaskStatus.InProgress, description: 'Task status', enum: TaskStatus, required: false })
  status?: TaskStatus;

  @ApiProperty({ example: SortTaskBy.createdAt, description: 'Task field sort by', required: false })
  sortBy?: SortTaskBy;

  @ApiProperty({ example: SortOrder.asc, description: 'Task sort order', required: false })
  sortOrder?: SortOrder
}