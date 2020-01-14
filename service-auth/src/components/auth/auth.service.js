import jwt from 'jsonwebtoken';
import config from '../../config';

export class AuthService {
  static generateToken(userId) {
    return jwt.sign({ id: userId }, config.secrets.jwt, {
      expiresIn: config.secrets.jwtExp,
    });
  }

  static verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.secrets.jwt, (err, payload) => {
        if (err) return reject(err);
        return resolve(payload);
      });
    });
  }
}
