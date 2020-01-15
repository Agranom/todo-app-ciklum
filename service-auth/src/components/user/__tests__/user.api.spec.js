import request from 'supertest';
import faker from 'faker';
import { app } from '../../../app';
import { connect } from '../../../utils/db';
import { User } from '../user.model';
import { AuthService } from '../../auth';

const testUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};
let server;
let db;

describe('User API', () => {
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

  describe('/GET /api/me', () => {
    it('should return user info', async () => {
      const user = await User.create(testUser);
      const token = AuthService.generateToken(user.id);
      const serializedUser = user.toObject();
      const { body } = await request(app)
        .get('/api/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(JSON.stringify(body)).toEqual(JSON.stringify(serializedUser));
    });

    it('should return 401 Unauthorized error when Auth header is not provided', async () => {
      await request(app)
        .get('/api/me')
        .expect(401);
    });

    it('should return 401 Unauthorized error when token is invalid', async () => {
      await request(app)
        .get('/api/me')
        .set('Authorization', `Bearer ${faker.random.uuid()}`)
        .expect(401);
    });
  });
});
