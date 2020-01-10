import jwt from 'jsonwebtoken';
import config from '../config';

export const generateToken = (userId) => jwt.sign({ id: userId }, config.secrets.jwt, {
  expiresIn: config.secrets.jwtExp,
});

export const verifyToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, config.secrets.jwt, (err, payload) => {
    if (err) return reject(err);
    return resolve(payload);
  });
});
