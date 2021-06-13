import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import loggingMiddleware from 'middlewares/logging';
import errorHandlingMiddleware from 'middlewares/errorHandling';
import { errorLog } from 'logger';
import userRouter from 'resources/users/user.router';
import boardRouter from 'resources/boards/board.router';
import taskRouter from 'resources/tasks/task.router';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(loggingMiddleware);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use(errorHandlingMiddleware);

process.on('uncaughtException', (err) => {
  errorLog(err.message, err);
});

process.on('unhandledRejection', (reason, promise) => {
  promise.catch((error) => {
    errorLog(error.message, { reason, error });
  });
});

export default app;
