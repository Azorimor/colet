const {setupDB} =require('./test-setup');
setupDB('utility-testing');

const app = require('../src/server');
const supertest = require('supertest');
const request = supertest(app);

describe('Testing utility functions', () => {
  it('Testing routes', async (done) => {
    const res = await request.get('/');
    expect(res.body.status).toBe('API is working');
    done();
  });
});
