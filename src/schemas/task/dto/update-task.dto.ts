import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({ example: 'Title1', description: 'Task title', required: false })
  title?: string;

  @ApiProperty({ example: 'New', description: 'Task status', required: false })
  status?: string;
}
