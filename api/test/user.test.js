const {setupDB} =require('./test-setup');
setupDB('user-testing');

const UserModel = require('../src/models/user.model');

const app = require('../src/server');
const supertest = require('supertest');
const request = supertest(app);

describe('POST /user', () => {
  test('Create user', async (done) => {
    const data = {
      username: 'Testnutzer',
      email: 'email@mail.com',
      password: 'securePassword'
    }
    const response = await request
      .post('/user')
      .send(data)
      .expect(200);
    
    expect(response.body.data._id).toBeTruthy();
    expect(response.body.data.username).toBeTruthy();
    expect(response.body.data.email).toBeTruthy();

    const user = await UserModel.findOne({_id: response.body.data._id});
    expect(user).toBeTruthy();
    expect(user.name).toBe(data.name);
    expect(user.email).toBe(data.email);
    done();
  });
});
