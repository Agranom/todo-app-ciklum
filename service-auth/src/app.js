import express from 'express';
import { json, urlencoded } from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import { userRouter } from './components/user';
import { authRouter } from './components/auth';
import { handleHttpError } from './utils/error-handler';
import { httpLogger, logger } from './utils/logger';


export const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(json({ limit: '5mb' }));
app.use(urlencoded({ extended: true }));
app.use(httpLogger);
app.use(passport.initialize());

app.use('/', authRouter);
app.use('/api/me', userRouter);
app.use((err, req, res, next) => {
  handleHttpError(err, res);
});

process.on('uncaughtException', (error) => {
  logger.error(error);
  if (!error.isOperational) {
    process.exit(1);
  }
});
