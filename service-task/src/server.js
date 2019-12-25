import express from 'express';
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import config from './config';
import { connect } from './utils/db';
import taskRouter from './routes/task.router';
import { validateTokenAndGetUser } from './utils/auth';
import swaggerDoc from '../doc/swagger';

export const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/api/task', validateTokenAndGetUser, taskRouter);

export const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => console.log(`Server is running on port ${config.port}`));
  } catch (e) {
    console.error(e);
  }
};
