import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";
import * as mongoose from "mongoose";
import {Project} from "@src/schemas/project/project.schema";

export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {
  @Prop()
  @ApiProperty({ example: 'Title1', description: 'Task title' })
  title: string;

  @Prop({ default: 'New' })
  @ApiProperty({ example: 'New', description: 'Task status' })
  status: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Project'})
  projectId: Project
}

export const TaskSchema = SchemaFactory.createForClass(Task);