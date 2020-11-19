const {setupDB} =require('./test-setup');
setupDB('user-testing');

const UserModel = require('../src/models/user.model');

const app = require('../src/server');
const supertest = require('supertest');
const request = supertest(app);

const data = {
  username: 'Testnutzer',
  email: 'email@mail.com',
  password: 'securePassword',
};

describe('POST /user', () => {
  it('Create user', async (done) => {
    const response = await request
        .post('/user')
        .send(data)
        .expect(200);

    // Check response
    expect(response.body.data._id).toBeTruthy();
    expect(response.body.data.username).toBe(data.username);
    expect(response.body.data.email).toBe(data.email);
    // TODO check empty response.password

    // Check database
    const user = await UserModel.findOne({_id: response.body.data._id});
    expect(user).toBeTruthy();
    expect(user.username).toBe(data.username);
    expect(user.email).toBe(data.email);
    done();
  });
  it('Fail create user (email in use)', async (done) => {
    const existingUser = new UserModel({
      username: 'SecondUser',
      email: 'email@mail.com',
      password: 'securePas',
    });
    await existingUser.save();
    const response = await request
        .post('/user')
        .send(data)
        .expect(200);

    // Check response
    expect(response.body.data).toBeFalsy();
    expect(response.body.success).toBeFalsy();

    // Check database
    const user = await UserModel.findOne({email: data.email});
    expect(user).toBeTruthy();
    expect(user.username).toBe(existingUser.username);
    expect(user.email).toBe(existingUser.email);
    done();
  });

  it('Fail create user (no password)', async (done) => {
    const response = await request
        .post('/user')
        .send({
          username: 'Testname',
          email: 'mail@mail.com',
        })
        .expect(200);

    // Check response
    expect(response.body.data).toBeFalsy();
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toBeTruthy();

    // Check database
    const user = await UserModel.findOne({email: 'mail@mail.com'});
    expect(user).toBeNull();
    done();
  });

  it('Fail create user (no email)', async (done) => {
    const response = await request
        .post('/user')
        .send({
          username: 'Testname',
          password: 'secPass',
        })
        .expect(200);

    // Check response
    expect(response.body.data).toBeFalsy();
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toBeTruthy();

    // Check database
    const user = await UserModel.findOne({username: 'Testname'});
    expect(user).toBeNull();
    done();
  });

  it('Fail create user (no username)', async (done) => {
    const response = await request
        .post('/user')
        .send({
          email: 'mail@mail.com',
          password: 'savePassword',
        })
        .expect(200);

    // Check response
    expect(response.body.data).toBeFalsy();
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toBeTruthy();

    // Check database
    const user = await UserModel.findOne({email: 'mail@mail.com'});
    expect(user).toBeNull();
    done();
  });

  it('Fail create user (no valid email)', async (done) => {
    const response = await request
        .post('/user')
        .send({
          username: 'Testname',
          email: 'mailmail.com',
          password: 'savePassword',
        })
        .expect(200);

    // Check response
    expect(response.body.data).toBeFalsy();
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toBeTruthy();

    // Check database
    const user = await UserModel.findOne({email: 'mail@mail.com'});
    expect(user).toBeNull();
    done();
  });
});

describe('GET /user/:id', () => {
  it('Get userinformation', async (done) => {
    const existingUser = new UserModel(data);
    await existingUser.save();

    const response = await request
        .get(`/user/${existingUser._id}`)
        .expect(200);

    // Check response
    expect(response.body.data._id).toBe(existingUser._id);
    expect(response.body.data.username).toBe(data.username);
    expect(response.body.data.email).toBe(data.email);
    done();
  });

  it('Not get userinformation from non-existing user', async (done) => {
    const response = await request
        .get('/user/fancyID')
        .expect(404);

    // Check response
    expect(response.body.data).toBeFalsy();
    expect(response.body.success).toBeFalsy();
    expect(response.body.message).toBeTruthy();
    done();
  });
});
