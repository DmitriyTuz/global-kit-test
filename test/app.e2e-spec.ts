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

      const tasksData: CreateTaskDto[] = [
        { title: 'Test Task 1', projectId: project._id as unknown as ObjectId },
        { title: 'Test Task 2', projectId: project._id as unknown as ObjectId },
        { title: 'Test Task 3', projectId: project._id as unknown as ObjectId },
      ];

      const tasks: TaskDocument[] = [];
      for (const taskData of tasksData) {
        const task = await taskService.createTask(taskData);
        tasks.push(task);
      }

      const response = await request(app.getHttpServer())
          .get('/task/get-all-tasks')
          .expect(HttpStatus.OK)

      // console.log('! response.body =', response.body);

      expect(Array.isArray(response.body)).toBe(true);
      for (const taskData of tasksData) {
        const createdTask = response.body.find((t) => t.title === taskData.title);
        expect(createdTask).toBeDefined();
        expect(createdTask.title).toBe(taskData.title);
        expect(createdTask.projectId).toBe(project._id.toString());
      }
    });

    it('/task/get-tasks-filter-sort (GET)', async () => {
      const createProjectData: CreateProjectDto = {
        name: 'Test Project',
      };
      const project: ProjectDocument = await projectService.createProject(createProjectData);

      const tasksData: CreateTaskDto[] = [
        { title: 'Test Task 1', projectId: project._id as unknown as ObjectId },
        { title: 'Test Task 2', projectId: project._id as unknown as ObjectId },
        { title: 'Test Task 3', projectId: project._id as unknown as ObjectId },
      ];

      const tasks: TaskDocument[] = [];
      for (const taskData of tasksData) {
        const task = await taskService.createTask(taskData);
        tasks.push(task);
      }

      const response = await request(app.getHttpServer())
          .get('/task/get-tasks-filter-sort')
          .query({ sortBy: 'createdAt', sortOrder: 'asc' })
          .expect(HttpStatus.OK);

      // console.log('! response.body =', response.body);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(3);

      const sortedTasks = response.body.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
      expect(response.body).toEqual(sortedTasks);

      for (const taskData of tasksData) {
        const createdTask = response.body.find((t) => t.title === taskData.title);
        expect(createdTask).toBeDefined();
        expect(createdTask.title).toBe(taskData.title);
        expect(createdTask.projectId).toBe(project._id.toString());
      }
    });
  });
});
