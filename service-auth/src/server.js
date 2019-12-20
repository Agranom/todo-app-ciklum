import express from 'express';
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import passport from 'passport';
import config from './config';
import { connect } from './utils/db';
import { signin, signup } from './controllers/auth.controllers';
import userRouter from './routes/user.router';
import authRouter from './routes/auth.router';

export const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(passport.initialize());

app.post('/signup', signup);
app.post('/signin', signin);
app.use('/api/me', userRouter);
app.use('/api/internal/validate-token', authRouter);

export const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => console.log(`Server is running on port ${config.port}`));
  } catch (e) {
    console.error(e);
  }
};
