import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { FileUploader } from '../../utils/file-uploader';
import { ErrorHandler } from '../../utils/error-handler';

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
  avatar: Object,
});

userSchema.pre('save', function hashPassword(next) {
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
    return next(new ErrorHandler(400, e.message));
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
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }

      return resolve(same);
    });
  });
};

export const User = mongoose.model('User', userSchema);
