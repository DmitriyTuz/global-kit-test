import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import {Task, TaskDocument} from "@src/schemas/task/task.schema";
import {CreateTaskDto} from "@src/schemas/task/dto/create-task.dto";
import {UpdateTaskDto} from "@src/schemas/task/dto/update-task.dto";
import {FilterTaskDto} from "@src/schemas/task/dto/filter-task.dto";

@Injectable()
export class TaskService {

  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async createTask(dto: CreateTaskDto) {
    return this.taskModel.create({...dto});
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskModel.find();
  }

  async search(searchQuery: string): Promise<Task[]> {
    return this.taskModel.find({
      title: {$regex: new RegExp(searchQuery, 'i')}
    });
  }

  async updateById(id: ObjectId, updateTaskDto: UpdateTaskDto) {
    return this.taskModel.findByIdAndUpdate(id, updateTaskDto, {new: true});
  }

  async deleteById(id: ObjectId): Promise<ObjectId> {
    const task = await this.taskModel.findByIdAndDelete(id);
    // const task = await this.taskModel.deleteOne({_id: objectId});
    return task.id;
  }

  // async getTasks(status?: string, projectId?: ObjectId, sortBy?: string, sortOrder: 'asc' | 'desc' = 'asc'): Promise<Task[]> {
  //   const filter: any = {};
  //   if (status) {
  //     filter.status = status;
  //   }
  //   if (projectId) {
  //     filter.projectId = projectId;
  //   }
  //
  //   const sort: any = {};
  //   if (sortBy) {
  //     sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
  //   }
  //
  //   return this.taskModel.find(filter).sort(sort).exec();
  // }

  async getTasks(dto: FilterTaskDto): Promise<Task[]> {
    const filter: any = {};
    if (dto.status) {
      filter.status = dto.status;
    }
    if (dto.projectId) {
      filter.projectId = dto.projectId;
    }

    const sort: any = {};
    if (dto.sortBy) {
      sort[dto.sortBy] = dto.sortOrder === 'asc' ? 1 : -1;
    }

    return this.taskModel.find(filter).sort(sort).exec();
  }

  async deleteAll(): Promise<void> {
    await this.taskModel.deleteMany({});
  }
}
