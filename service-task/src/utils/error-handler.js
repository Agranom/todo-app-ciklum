import { logger } from './logger';

export function handleHttpError(err, res) {
  const { statusCode, isOperational, ...rest } = err;
  logger.error(err);
  res.status(statusCode).json({ statusCode, ...rest });
}
