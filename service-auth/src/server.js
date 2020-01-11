import express from 'express';
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import config from './config';
import { connect } from './utils/db';
import { signin, signup } from './controllers/auth.controllers';
import userRouter from './routes/user.router';
import authRouter from './routes/auth.router';
import { handleError } from './utils/error-handler';


export const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(json({ limit: '5mb' }));
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(passport.initialize());

app.post('/signup', signup);
app.post('/signin', signin);
app.use('/api/me', userRouter);
app.use('/api/internal/validate-token', authRouter);
app.use((err, req, res, next) => {
  handleError(err, res);
});


export const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => console.info(`Server is running on port ${config.port}`));
  } catch (e) {
    console.error(e);
  }
};
