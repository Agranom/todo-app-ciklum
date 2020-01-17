import jwt from 'jsonwebtoken';
import config from '../../config';
import { AppError, mongoErrorTypes, ValidationError } from '../shared/errors';

export class AuthService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  static generateToken(userId) {
    return jwt.sign({ id: userId }, config.secrets.jwt, {
      expiresIn: config.secrets.jwtExp,
    });
  }

  static verifyToken(token) {
    return jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) {
        throw new AppError(400, err.message);
      }
      return payload;
    });
  }

  async signup(data) {
    try {
      return await this.userModel.create(data);
    } catch (e) {
      if (e.name === mongoErrorTypes.mongoError && e.code === 11000) {
        throw new AppError(400, 'User with this email already exists');
      }
      if (e.name === mongoErrorTypes.validationError) {
        throw new ValidationError(e.errors);
      }
      throw new AppError(500, e.message);
    }
  }

  async signin(email) {
    try {
      return await this.userModel.findOne({ email });
    } catch (e) {
      throw new AppError(500, e.message);
    }
  }

  async validateTokenAndReturnUser(token) {
    try {
      const tokenPayload = AuthService.verifyToken(token);
      return await this.userModel.findById(tokenPayload.id);
    } catch (e) {
      throw new AppError(400, e.message);
    }
  }
}
