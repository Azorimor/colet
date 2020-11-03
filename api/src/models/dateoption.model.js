const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dateoptionSchema = new Schema({
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  }, // TODO maybe validation (only same day allowed)
  anonymUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'AnonymUser',
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Dateoption', dateoptionSchema);
