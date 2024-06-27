import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Task, TaskDocument} from "@src/schemas/task/task.schema";
import {CreateTaskDto} from "@src/schemas/task/dto/create-task.dto";
import {ObjectId} from "mongoose";


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

  async deleteById(id: ObjectId): Promise<ObjectId> {
    const task = await this.taskModel.findByIdAndDelete(id);
    // const task = await this.taskModel.deleteOne({_id: objectId});
    return task.id;
  }
}
