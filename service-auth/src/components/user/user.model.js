import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { FileUploader } from '../../utils/file-uploader';
import { AppError } from '../shared/errors';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    maxlength: [55, 'First name must be less then 55 characters'],
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: [55, 'Last name must be less then 55 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email is not valid',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
    minlength: [3, 'Password must have at least 3 characters'],
  },
  avatar: Object,
});

userSchema.pre('save', function hashPassword(next) {
  if (!this.isModified('password')) {
    return next();
  }

  return bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(new AppError(400, err.message));
    }

    this.password = hash;
    return next();
  });
});

userSchema.pre('save', async function uploadAvatar(next) {
  if (!this.isModified('avatar')) {
    return next();
  }
  const fileUploader = new FileUploader();

  try {
    const { Location } = await fileUploader.uploadImageToAwsBucket(this.avatar);
    this.avatar = Location;

    return next();
  } catch (e) {
    return next(e);
  }
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
    bcrypt.compare(password, passwordHash, (err, isSame) => {
      if (err) {
        return reject(new AppError(400, err.message));
      }

      return resolve(isSame);
    });
  });
};

export const User = mongoose.model('User', userSchema);
