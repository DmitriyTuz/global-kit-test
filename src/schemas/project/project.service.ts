import {Injectable} from '@nestjs/common';
import {CreateProjectDto} from "@src/schemas/project/dto/create-project.dto";
import {Project, ProjectDocument} from "@src/schemas/project/project.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class ProjectService {

  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {}

  async createProject(dto: CreateProjectDto) {
    return await this.projectModel.create({...dto});
  }
}
