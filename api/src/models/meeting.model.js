const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const meetingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  desciption: {
    type: String,
  },
  times: [{
    type: Schema.Types.ObjectId,
    ref: 'Dateoption',
  }],
  creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  project: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Project',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Meeting', meetingSchema);
