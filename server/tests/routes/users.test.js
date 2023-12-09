const path = require('path');
const dotenv = require('dotenv'); // eslint-disable-line
const request = require('supertest'); // eslint-disable-line

dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });

const app = require('../../src/app');
const db = require('../../src/db');
const Admin = require('../../src/models/Admin');

beforeAll(async () => Admin.deleteMany());

afterAll(async () => db.close());

test('creates a new admin', async () =>
  request(app)
    .post('/api/v1/admins?userType=admin')
    .send({
      firstName: 'Jessi',
      lastName: 'Hollander',
      phoneNumber: '01007683940',
      email: 'superadmin@shababek.com',
      password: 'shababek',
    })
    .expect(201));
