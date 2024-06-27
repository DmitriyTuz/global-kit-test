import {Body, Controller, Post, UsePipes} from '@nestjs/common';
import {ProjectService} from "@src/schemas/project/project.service";
import {Project} from "@src/schemas/project/project.schema";
import {CreateProjectDto} from "@src/schemas/project/dto/create-project.dto";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateTaskDto} from "@src/schemas/task/dto/create-task.dto";
import {Task} from "@src/schemas/task/task.schema";
import {ValidationPipe} from "@src/pipes/validation.pipe";

@ApiTags('Projects')
@Controller('project')
export class ProjectController {

  constructor(private projectService: ProjectService) {
  }

  @Post('/create-project')
  @ApiOperation({ summary: 'Create project' })
  @ApiBody({ type: CreateProjectDto, description: 'Create project data' })
  @ApiResponse({ status: 201, description: 'Project has been successfully created' })
  @ApiResponse({ status: 400, description: 'Unable to create project' })
  @UsePipes(ValidationPipe)
  async create(@Body() dto: CreateProjectDto): Promise<Project> {
    return await this.projectService.createProject(dto);
  }

  @Post('/add-task')
  @ApiOperation({ summary: 'Add task' })
  @ApiBody({ type: CreateTaskDto, description: 'Add task data' })
  @UsePipes(ValidationPipe)
  async addTask(@Body() dto: CreateTaskDto): Promise<Task>  {
    return await this.projectService.addTask(dto);
  }
}
