import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import { taskRouter } from './components/task';
import { validateTokenAndGetUser } from './utils/auth';
import { httpLogger } from './utils/logger';
import { handleHttpError } from '../../service-auth/src/utils/error-handler';
import { logger } from '../../service-auth/src/utils/logger';

export const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(httpLogger);

app.use('/api/task', validateTokenAndGetUser, taskRouter);
app.use((err, req, res, next) => {
  handleHttpError(err, res);
});

process.on('uncaughtException', (error) => {
  logger.error(error);
  if (!error.isOperational) {
    process.exit(1);
  }
});
