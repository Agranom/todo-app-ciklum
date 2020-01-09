import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', function preSave(next) {
  if (!this.isModified('password')) {
    return next();
  }

  return bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;
    return next();
  });
});

userSchema.set('toObject', {
  transform: (doc, ret) => {
    const {
      _id, __v, password, ...rest
    } = ret;

    return { id: _id, ...rest };
  },
});

userSchema.methods.validatePassword = function validatePassword(password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }

      return resolve(same);
    });
  });
};

const User = mongoose.model('User', userSchema);

export default User;
