import config from '../config';
import jwt from 'jsonwebtoken';

export const generateToken = userId => {
  return jwt.sign({ id: userId }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  });
};
