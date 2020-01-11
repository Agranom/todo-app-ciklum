import request from 'supertest';
import faker from 'faker';
import { app } from '../server';
import { connect } from '../utils/db';
import { User } from '../models/user.model';
import { generateToken } from '../utils/auth';

const testUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};
let server;
let db;


describe('Auth API', () => {
  beforeEach(async (done) => {
    db = await connect();
    await User.deleteMany({});
    server = app.listen(4000, () => {
      global.agent = request.agent(server);
      done();
    });
  });

  afterEach(async () => {
    await server.close();
    await db.disconnect();
  });

  describe('/POST /signup', () => {
    it('should return 400 error when email or password is not provided', async () => {
      await request(app)
        .post('/signup')
        .send({ password: faker.internet.password() })
        .expect(400);

      await request(app)
        .post('/signup')
        .send({ email: faker.internet.email() })
        .expect(400);
    });

    it('should return token when sign up is successful', async () => {
      const { body } = await request(app)
        .post('/signup')
        .send(testUser)
        .expect(201);

      expect(body.token).toBeDefined();
    });

    it('should return 400 status code when user with the same email is already exist', async () => {
      await User.create(testUser);
      await request(app)
        .post('/signup')
        .send(testUser)
        .expect(400);
    });
  });

  describe('/POST /signin', () => {
    it('should return 400 error when email or password is not provided', async () => {
      await request(app)
        .post('/signin')
        .send({ email: testUser.email })
        .expect(400);

      await request(app)
        .post('/signin')
        .send({ password: testUser.password })
        .expect(400);
    });

    it('should return 401 error when user with provided email is not found', async () => {
      await request(app)
        .post('/signin')
        .send({ email: testUser.email, password: testUser.password })
        .expect(401);
    });

    it('should return 401 error when provided password is not valid', async () => {
      await User.create(testUser);
      await request(app)
        .post('/signin')
        .send({ email: testUser.email, password: faker.internet.password() })
        .expect(401);
    });

    it('should return token when sign in successfully', async () => {
      const { body } = await request(app)
        .post('/signin')
        .send({ email: testUser.email, password: testUser.password })
        .expect(200);

      expect(body.token).toBeDefined();
    });
  });

  describe('/POST /api/internal/validate-token', () => {
    const headers = { Authorization: `Basic ${Buffer.from('admin:admin').toString('base64')}` };
    let token;
    let user;

    beforeEach(async () => {
      user = await User.create({ email: faker.internet.email(), password: faker.internet.password() });
      token = generateToken(user.id);
    });

    it('should return 401 status code when auth header is not provided', async () => {
      await request(app)
        .post('/api/internal/validate-token')
        .send({ token })
        .expect(401);
    });

    it('should return 401 status code when token is not provided', async () => {
      await request(app)
        .post('/api/internal/validate-token')
        .set(headers)
        .send()
        .expect(401);
    });

    it('should return 401 status code when token is not valid', async () => {
      await request(app)
        .post('/api/internal/validate-token')
        .set(headers)
        .send({ token: generateToken(faker.random.uuid()) })
        .expect(401);
    });

    it('should return status 200 and user when token is valid', async () => {
      const { body } = await request(app)
        .post('/api/internal/validate-token')
        .set(headers)
        .send({ token })
        .expect(200);

      expect(JSON.stringify(body)).toEqual(JSON.stringify(user.toObject()));
    });
  });
});
