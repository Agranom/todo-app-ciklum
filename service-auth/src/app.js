import express from 'express';
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import { userRouter } from './components/user';
import { authRouter } from './components/auth';
import { handleError } from './utils/error-handler';


export const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(json({ limit: '5mb' }));
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(passport.initialize());

app.use('/', authRouter);
app.use('/api/me', userRouter);
app.use((err, req, res, next) => {
  handleError(err, res);
});
