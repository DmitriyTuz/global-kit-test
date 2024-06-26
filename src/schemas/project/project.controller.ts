import {Body, Controller, Post} from '@nestjs/common';
import {ProjectService} from "@src/schemas/project/project.service";
import {Project} from "@src/schemas/project/project.schema";
import {CreateProjectDto} from "@src/schemas/project/dto/create-project.dto";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

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
  async create(@Body() dto: CreateProjectDto): Promise<Project> {
    return await this.projectService.createProject(dto);
  }
}
