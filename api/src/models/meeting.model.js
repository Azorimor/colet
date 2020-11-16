const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator');

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const meetingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
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
  public: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    select: false,
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  anonyms: [{
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: [isEmail, 'invalid email'],
    }
  }],
}, {
  timestamps: true,
});

/**
 * Store the password savely with bcrypt.
 */
meetingSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

/**
 * Validate, if a given string is the password of the project.
 * @param {*} candidatePassword The password, which should be checked.
 */
meetingSchema.methods.validatePassword =
  async function validatePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

module.exports = mongoose.model('Meeting', meetingSchema);
