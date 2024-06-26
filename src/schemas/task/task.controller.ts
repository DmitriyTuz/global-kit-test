import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {Task} from "@src/schemas/task/task.schema";
import {CreateTaskDto} from "@src/schemas/task/dto/create-task.dto";
import {TaskService} from "@src/schemas/task/task.service";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateProjectDto} from "@src/schemas/project/dto/create-project.dto";
import {count} from "rxjs";

@ApiTags('Tasks')
@Controller('task')
export class TaskController {

  constructor(private taskService: TaskService) {
  }

  @Post('/create-task')
  @ApiOperation({ summary: 'Create task' })
  @ApiBody({ type: CreateTaskDto, description: 'Create task data' })
  @ApiResponse({ status: 201, description: 'Task has been successfully created' })
  @ApiResponse({ status: 400, description: 'Unable to create task' })
  async create(@Body() dto: CreateTaskDto): Promise<Task> {
    return await this.taskService.createTask(dto);
  }

  @Get('/get-all-tasks')
  @ApiOperation({ summary: 'Get all tasks' })
  async getAll(): Promise<Task[]>{
    return await this.taskService.getAllTasks();
  }

  @Get('/search')
  @ApiOperation({ summary: 'Search task' })
  async search(
      @Query('searchQuery') searchQuery: string,
  ) {
    return await this.taskService.search(searchQuery);
  }


}
