const {setupDB} =require('./test-setup');
setupDB('meeting-testing');

const MeetingModel = require('../src/models/meeting.model');
const UserModel = require('../src/models/user.model');

const app = require('../src/server');
const supertest = require('supertest');
const request = supertest(app);

describe('POST /meeting', () => {
  it('Create meeting', async (done) => {
    const user = new UserModel({
      username: 'Meetingcreator',
      email: 'meeting@mail.com',
      password: 'testpassword',
    });
    const creator = await user.save();
    const data = {
      name: 'Testmeeting',
      description: 'Testing description.',
      password: 'securePassword',
      public: 'true',
      creator: creator,
    }
    const response = await request
      .post('/meeting')
      .send(data)
      .expect(200);
    
    expect(response.body.data._id).toBeTruthy();
    expect(response.body.data.name).toBeTruthy();
    expect(response.body.data.description).toBeTruthy();
    // TODO add other

    const meeting = await MeetingModel.findOne({_id: response.body.data._id});
    expect(meeting).toBeTruthy();
    expect(meeting.name).toBe(data.name);
    expect(meeting.description).toBe(data.description);
    // TODO add other attributes
    done();
  });
});
