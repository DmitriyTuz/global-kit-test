import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import {Project, ProjectSchema} from "@src/schemas/project/project.schema";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [
    MongooseModule.forFeature([{name: Project.name, schema: ProjectSchema}])
  ]
})
export class ProjectModule {}
