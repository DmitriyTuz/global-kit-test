import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import {Task} from "@src/schemas/task/task.schema";
import {CreateTaskDto} from "@src/schemas/task/dto/create-task.dto";
import {TaskService} from "@src/schemas/task/task.service";
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ObjectId} from "mongoose";


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
  create(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(dto);
  }

  @Get('/get-all-tasks')
  @ApiOperation({ summary: 'Get all tasks' })
  getAll(): Promise<Task[]>{
    return this.taskService.getAllTasks();
  }

  @Get('/search')
  @ApiOperation({ summary: 'Search task' })
  search(@Query('searchQuery') searchQuery: string) {
    return this.taskService.search(searchQuery);
  }

  @Delete('/delete-task/:id')
  @ApiOperation({ summary: 'Delete task' })
  @ApiParam({ name: 'id', example: '667c95047e13eba4d35c3e9c', type: String, description: 'The id of the task to delete' })
  delete(@Param('id') id: ObjectId) {
    return this.taskService.deleteById(id);
  }
}
