import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import {Task, TaskDocument} from "@src/schemas/task/task.schema";
import {CreateTaskDto} from "@src/schemas/task/dto/create-task.dto";
import {UpdateTaskDto} from "@src/schemas/task/dto/update-task.dto";


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

  async getTasks(status?: string, projectId?: ObjectId, sortBy?: string, sortOrder: 'asc' | 'desc' = 'asc'): Promise<Task[]> {
    const filter: any = {};
    if (status) {
      filter.status = status;
    }
    if (projectId) {
      filter.projectId = projectId;
    }

    const sort: any = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }

    console.log('filter = ', filter);
    // return this.taskModel.find(filter);
    return this.taskModel.find(filter).sort(sort).exec();
  }
}
