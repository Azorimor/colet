const assert = require('assert');

const {setupDB} = require('./setup.test');
const UserModel = require('../src/models/user.model');
const { request } = require('http');

setupDB('userTests');

describe('Creating user', () => {
  it('Should save user to the database', async (done) => {
    const res = await request.post('/signup').send({
      username: 'Testuser',
      email: 'test@mail.com',
      password: 'SuperSecurePassword',
    });

    // Search for user in database
    const user = await UserModel.findOne({username: 'Testuser'})

    // Check, if response contains fields
    expect(res.body.name).toBeTruthy();
    expect(res.body.email).toBeTruthy();
    expect(res.body.password).toBeTruthy();
  });
  expect(user.name).toBeTruthy();
  expect(user.email).toBeTruthy();
  expect(user.password).toBeTruthy();
  expect(user._id).toBeTruthy();

  done();
});
