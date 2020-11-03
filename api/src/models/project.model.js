const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  public: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  meetings: [{
    type: Schema.Types.ObjectId,
    ref: 'Meeting',
  }],
}, {
  timestamps: true,
});

/**
 * Store the password savely with bcrypt.
 */
projectSchema.pre('save', async function save(next) {
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
projectSchema.methods.validatePassword =
  async function validatePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

module.exports = mongoose.model('Project', projectSchema);
