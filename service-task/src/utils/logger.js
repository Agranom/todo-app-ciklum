import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import * as rfs from 'rotating-file-stream';
import { createLogger, format, transports } from 'winston';

const logDirectory = path.join(__dirname, '../../log');
fs.existsSync(logDirectory || fs.mkdirSync(logDirectory));
const logStream = rfs.createStream('http.log', {
  size: '10M',
  interval: '1d',
  path: logDirectory,
});

export const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: 'service-task' },
  transports: [
    new transports.File({ filename: `${logDirectory}/error.log`, level: 'error' }),
    new transports.File({ filename: `${logDirectory}/combined.log` }),
  ],
});

let morganLogger;

if (process.env.NODE_ENV !== 'production') {
  morganLogger = morgan('dev');
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple(),
    ),
  }));
} else {
  morganLogger = morgan('common', { stream: logStream });
}

export const httpLogger = morganLogger;
