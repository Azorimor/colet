const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator');

const {customAlphabet} = require('nanoid');
const nanoid = customAlphabet('2346789ABCDEFGHJKLMNPQRTUVWXYZabcdefghijkmnpqrtwxyz', 12);

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [isEmail, 'invalid email'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  projects: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  meetings: {
    type: Schema.Types.ObjectId,
    ref: 'Meeting',
  },
}, {
  timestamps: true,
});

/**
 * Store the password savely with bcrypt.
 */
userSchema.pre('save', async function save(next) {
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
 * Validate, if a given string is the password of the user.
 * @param {*} candidatePassword The password, which should be checked.
 */
userSchema.methods.validatePassword =
  async function validatePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

module.exports = mongoose.model('User', userSchema);
