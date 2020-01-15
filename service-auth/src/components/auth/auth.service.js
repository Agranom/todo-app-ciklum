import jwt from 'jsonwebtoken';
import config from '../../config';
import { ErrorHandler } from '../../utils/error-handler';

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
        throw new ErrorHandler(400, err.message);
      }
      return payload;
    });
  }

  async signup(data) {
    try {
      return await this.userModel.create(data);
    } catch (e) {
      if (e.name === 'MongoError' && e.code === 11000) {
        throw new ErrorHandler(400, 'User with this email already exists');
      }
      throw new ErrorHandler();
    }
  }

  async signin(email) {
    try {
      return await this.userModel.findOne({ email });
    } catch (e) {
      throw new ErrorHandler();
    }
  }

  async validateTokenAndReturnUser(token) {
    try {
      const tokenPayload = AuthService.verifyToken(token);
      return await this.userModel.findById(tokenPayload.id);
    } catch (e) {
      console.error(e);
      throw new ErrorHandler(401, 'Unauthorized');
    }
  }
}
