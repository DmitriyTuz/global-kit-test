import { ApiProperty } from '@nestjs/swagger';
import {TaskStatus} from "@src/schemas/task/task.schema";

export class UpdateTaskDto {
  @ApiProperty({ example: 'Title1', description: 'Task title', required: false })
  title?: string;

  @ApiProperty({ example: TaskStatus.InProgress, description: 'Task status', enum: TaskStatus, required: false })
  status?: TaskStatus;

  // @ApiProperty({ example: 'New', description: 'Task status', required: false })
  // status?: string;
}
