const mongoose = require('mongoose');
const {isEmail} = require('validator');

const Schema = mongoose.Schema;

const anonymUserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail, 'invalid email'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('AnonymUser', anonymUserSchema);
