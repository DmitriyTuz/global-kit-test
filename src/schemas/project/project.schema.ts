import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";
import * as mongoose from "mongoose";
import {Task} from "@src/schemas/task/task.schema";

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop()
  @ApiProperty({ example: 'Project1', description: 'Project name' })
  name: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]})
  tasks: Task[];

}

export const ProjectSchema = SchemaFactory.createForClass(Project);