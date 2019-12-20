import config from '../config';
import jwt from 'jsonwebtoken';

export const generateToken = userId => {
  return jwt.sign({ id: userId }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  });
};

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
