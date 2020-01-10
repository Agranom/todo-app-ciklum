import request from 'supertest';
import faker from 'faker';
import nock from 'nock';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { connect } from '../utils/db';
import { Task } from '../models/task.model';
import { app } from '../server';

const userId = mongoose.Types.ObjectId();
const task = {
  title: faker.random.word(),
  description: faker.random.words(),
  status: 'undone',
  createdBy: userId,
};
const toJSON = (obj) => JSON.parse(JSON.stringify(obj));
const token = jwt.sign({ id: userId }, 'test_secret');
let server;
let db;

describe('Task API', () => {
  const headers = { Authorization: `Bearer ${token}` };

  beforeEach(async (done) => {
    db = await connect();
    await Task.deleteMany({});
    server = app.listen(4000, () => {
      global.agent = request.agent(server);
      done();
    });

    nock('http://localhost:3001')
      .post('/api/internal/validate-token', { token })
      .reply(200, { id: userId });
  });

  afterEach(async () => {
    await server.close();
    await db.disconnect();
  });

  describe('/GET /api/task', () => {
    it('should return all tasks', async () => {
      const newTask = await Task.create(task);
      const serializedTask = toJSON(newTask.toObject());
      const { body } = await request(app)
        .get('/api/task')
        .set(headers)
        .expect(200);

      expect(body.items.length).toBe(1);
      expect(body.items[0]).toEqual(serializedTask);
    });

    it('should return 401 error when auth header is not provided', async () => {
      await request(app)
        .get('/api/task')
        .expect(401);
    });
  });

  describe('/GET /api/task/:id', () => {
    it('should return task by id', async () => {
      const newTask = await Task.create(task);
      const serializedTask = toJSON(newTask.toObject());
      const { body } = await request(app)
        .get(`/api/task/${serializedTask.id}`)
        .set(headers)
        .expect(200);

      expect(body).toEqual(serializedTask);
    });

    it('should return 404 status code when non existed id is provided', async () => {
      const fakeId = '5df7b7baf3912835f71c3f8b';
      const newTask = await Task.create(task);
      const { id } = newTask.toObject();
      await request(app)
        .get(`/api/task/${fakeId}`)
        .set(headers)
        .expect(404);

      expect(fakeId).not.toBe(id);
    });
  });

  describe('/POST task', () => {
    it('should create new task', async () => {
      const { body } = await request(app)
        .post('/api/task')
        .set(headers)
        .send({
          title: task.title,
          description: task.description,
        })
        .expect(201);

      expect(body.title).toBe(task.title);
      expect(body.description).toBe(task.description);
      expect(body.status).toBe(task.status);
      expect(body.id).toBeDefined();
      expect(body.createdAt).toBeDefined();
      expect(Object.keys(body).length).toBe(5);
    });

    it('should return status code 400 when invalid data is provided', async () => {
      await request(app)
        .post('/api/task')
        .set(headers)
        .send({
          title: task.title,
          description: task.description,
          status: faker.random.word(),
        })
        .expect(400);
    });
  });

  describe('/PUT /api/task/:id', () => {
    it('should update task return 204', async () => {
      const newTask = await Task.create(task);
      const serializedTask = toJSON(newTask.toObject());
      const newTitle = faker.random.word();
      const expected = { ...serializedTask, title: newTitle };
      await request(app)
        .put(`/api/task/${serializedTask.id}`)
        .set(headers)
        .send({ title: newTitle })
        .expect(204);
      const updatedTask = await Task.findOne({ _id: serializedTask.id });

      expect(toJSON(updatedTask.toObject())).toEqual(expected);
    });

    it('should return 404 status code when none task is found by id', async () => {
      await request(app)
        .put('/api/task/5df7b7baf3912835f71c3f8b')
        .set(headers)
        .send({ title: faker.random.word() })
        .expect(404);
    });
  });

  describe('/DELETE /api/task/:id', () => {
    it('should delete task by id', async () => {
      const newTask = await Task.create(task);
      const { id } = newTask.toObject();
      let tasks = await Task.find().lean();
      expect(tasks.length).toBe(1);

      await request(app)
        .delete(`/api/task/${id}`)
        .set(headers)
        .expect(204);

      tasks = await Task.find().lean();
      expect(tasks.length).toBe(0);
    });

    it('should return 404 status code when none task found', async () => {
      await request(app)
        .delete('/api/task/5df7b7baf3912835f71c3f8b')
        .set(headers)
        .expect(404);
    });
  });
});
