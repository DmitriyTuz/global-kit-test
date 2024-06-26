import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Project, ProjectDocument} from "@src/schemas/project/project.schema";
import {Model} from "mongoose";
import {Task, TaskDocument} from "@src/schemas/task/task.schema";
import {CreateTaskDto} from "@src/schemas/task/dto/create-task.dto";

@Injectable()
export class TaskService {

  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async createTask(dto: CreateTaskDto) {
    return await this.taskModel.create({...dto});
  }
}
