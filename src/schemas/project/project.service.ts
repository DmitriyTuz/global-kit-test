import {HttpStatus, Injectable, Logger} from '@nestjs/common';
import {CreateProjectDto} from "@src/schemas/project/dto/create-project.dto";
import {Project, ProjectDocument} from "@src/schemas/project/project.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CreateTaskDto} from "@src/schemas/task/dto/create-task.dto";
import {Task} from "@src/schemas/task/task.schema";
import {TaskService} from "@src/schemas/task/task.service";
import {CustomHttpException} from "@src/exceptions/сustomHttp.exception";

@Injectable()
export class ProjectService {

  private readonly logger = new Logger(ProjectService.name);

  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
              private taskService: TaskService) {}

  async createProject(dto: CreateProjectDto) {
    return await this.projectModel.create({...dto});
  }

  async addTask(dto: CreateTaskDto): Promise<Task> {
    try {
      const project = await this.projectModel.findById(dto.projectId);
      const task = await this.taskService.createTask(dto);
      project.tasks.push(task.id);
      await project.save();
      return task;
    } catch (e) {
      this.logger.error(`Error during add task to project: ${e.message}`);
      throw new CustomHttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY, [e.message], new Error().stack);
    }
  }
}
