import request from 'supertest';
import { app } from '../server';
import { Task } from '../models/task.model';
import { connect } from '../utils/db';
import faker from 'faker';

const task = {
  title: faker.random.word(),
  description: faker.random.words(),
  status: 'undone',
};
const toJSON = obj => JSON.parse(JSON.stringify(obj));
let server;
let db;

describe('Task API', () => {

  beforeEach(async (done) => {
    db = await connect();
    await Task.deleteMany({});
    server = app.listen(4000, () => {
      global.agent = request.agent(server);
      done();
    });
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
        .expect(200);

      expect(body.items.length).toBe(1);
      expect(body.items[0]).toEqual(serializedTask);
    });
  });

  describe('/GET /api/task/:id', () => {

    it('should return task by id', async () => {
      const newTask = await Task.create(task);
      const serializedTask = toJSON(newTask.toObject());
      const { body } = await request(app)
        .get(`/api/task/${serializedTask.id}`)
        .expect(200);

      expect(body).toEqual(serializedTask);
    });

    it('should return 404 status code when non existed id is provided', async () => {
      const fakeId = '5df7b7baf3912835f71c3f8b';
      const newTask = await Task.create(task);
      const { id } = newTask.toObject();
      await request(app)
        .get(`/api/task/${fakeId}`)
        .expect(404);

      expect(fakeId).not.toBe(id);
    });
  });

  describe('/POST task', () => {

    it('should create new task', async () => {

      const { body } = await request(app)
        .post('/api/task')
        .send({
          title: task.title,
          description: task.description
        }).expect(201);

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
        .send({
          title: task.title,
          description: task.description,
          status: faker.random.word()
        }).expect(400);
    });
  });

  describe('/PUT /api/task/:id', () => {

    it('should update task and return the updated one', async () => {
      const newTask = await Task.create(task);
      const serializedTask = toJSON(newTask.toObject());
      const newTitle = faker.random.word();
      const expected = { ...serializedTask, title: newTitle };
      const { body } = await request(app)
        .put(`/api/task/${serializedTask.id}`)
        .send({ title: newTitle })
        .expect(200);

      expect(body).toEqual(expected);
    });

    it('should return 404 status code when none task is found by id', async () => {
      await request(app)
        .put(`/api/task/5df7b7baf3912835f71c3f8b`)
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
        .expect(204);

      tasks = await Task.find().lean();
      expect(tasks.length).toBe(0);
    });

    it('should return 404 status code when none task found', async () => {
      await request(app)
        .delete(`/api/task/5df7b7baf3912835f71c3f8b`)
        .expect(404);
    });
  });
});
