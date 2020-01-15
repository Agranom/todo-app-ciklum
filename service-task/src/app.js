import express from 'express';
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import { taskRouter } from './components/task';
import { validateTokenAndGetUser } from './utils/auth';

export const app = express();

app.use(express.static('public'));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/task', validateTokenAndGetUser, taskRouter);
