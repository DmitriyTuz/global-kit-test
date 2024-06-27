import { Test, TestingModule } from '@nestjs/testing';
import {HttpStatus, INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@src/app.module';
import {ProjectService} from "@src/schemas/project/project.service";
import {TaskService} from "@src/schemas/task/task.service";
import {CreateTaskDto} from "@src/schemas/task/dto/create-task.dto";
import {Project, ProjectDocument} from "@src/schemas/project/project.schema";
import {Task, TaskDocument} from "@src/schemas/task/task.schema";
import {CreateProjectDto} from "@src/schemas/project/dto/create-project.dto";
import { ObjectId } from 'mongoose';

describe('Tests API (e2e)', () => {
  let app: INestApplication;

  let projectService: ProjectService;
  let taskService: TaskService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    projectService = app.get<ProjectService>(ProjectService);
    taskService = app.get<TaskService>(TaskService);
  });

  afterEach(async () => {
    await taskService.deleteAll();
    await projectService.deleteAll();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Tasks API (e2e)', () => {
    it('/task/get-all-tasks (GET)', async () => {

      const createProjectData: CreateProjectDto = {
        name: 'Test Project'
      }
      const project: ProjectDocument = await projectService.createProject(createProjectData);

      const createTaskData: CreateTaskDto = {
        title: 'Test Task',
        projectId: project._id as unknown as ObjectId
      };

      const task: TaskDocument = await taskService.createTask(createTaskData);

      const response = await request(app.getHttpServer())
          .get('/task/get-all-tasks')
          .expect(HttpStatus.OK)

      // console.log('! response.body =', response.body);

      expect(Array.isArray(response.body)).toBe(true);
      const createdTask = response.body.find((t) => t.title === 'Test Task');
      expect(createdTask).toBeDefined();
      expect(createdTask.title).toBe('Test Task');
      expect(createdTask.projectId).toBe(project._id.toString());
    });
  });
});
