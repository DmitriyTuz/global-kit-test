import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Task, TaskSchema} from "@src/schemas/task/task.schema";


@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [
    MongooseModule.forFeature([{name: Task.name, schema: TaskSchema}])
  ],
  exports: [TaskService]
})
export class TaskModule {}
