import {Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes} from '@nestjs/common';
import {Task} from "@src/schemas/task/task.schema";
import {CreateTaskDto} from "@src/schemas/task/dto/create-task.dto";
import {TaskService} from "@src/schemas/task/task.service";
import {ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ObjectId} from "mongoose";
import {UpdateTaskDto} from "@src/schemas/task/dto/update-task.dto";
import {ValidationPipe} from "@src/pipes/validation.pipe";


@ApiTags('Tasks')
@Controller('task')
export class TaskController {

  constructor(private taskService: TaskService) {
  }

  @Post('/create-task')
  @ApiOperation({ summary: 'Create task' })
  @ApiBody({ type: CreateTaskDto, description: 'Task data for create' })
  @ApiResponse({ status: 201, description: 'Task has been successfully created' })
  @ApiResponse({ status: 400, description: 'Unable to create task' })
  @UsePipes(ValidationPipe)
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

  @Patch('/update-task/:id')
  @ApiOperation({ summary: 'Update task' })
  @ApiParam({ name: 'id', example: '667c8b87ea697ae124a41fd8', type: String, description: 'Task ID for update' })
  @ApiBody({ type: UpdateTaskDto, description: 'Task data for update' })
  // @UsePipes(ValidationPipe)
  update(@Param('id') id: ObjectId, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.updateById(id, updateTaskDto);
  }

  @Delete('/delete-task/:id')
  @ApiOperation({ summary: 'Delete task' })
  @ApiParam({ name: 'id', example: '667c95047e13eba4d35c3e9c', type: String, description: 'The id of the task to delete' })
  delete(@Param('id') id: ObjectId) {
    return this.taskService.deleteById(id);
  }

  @Get('/get-tasks-filter-sort')
  @ApiOperation({ summary: 'Get a list of tasks with filtering and sorting' })
  @ApiQuery({ name: 'status', example: 'New', required: false, description: 'Filtering by status' })
  @ApiQuery({ name: 'projectId', example: '667c87ef3490c6ec534d2df3', required: false, description: 'Filtering by Project ID' })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Sort field', example: 'createdAt' })
  @ApiQuery({ name: 'sortOrder', required: false, description: 'Sorting order', example: 'asc', enum: ['asc', 'desc'] })
  async getTasks(
      @Query('status') status?: string,
      @Query('projectId') projectId?: ObjectId,
      @Query('sortBy') sortBy?: string,
      @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc'
  ): Promise<Task[]> {
    return this.taskService.getTasks(status, projectId, sortBy, sortOrder);
  }
}
