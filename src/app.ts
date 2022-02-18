import express from 'express';
import './context';
import './services';
import {
  routers,
  requestLogger,
  responseLogger,
} from './controllers';

export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(requestLogger);
  routers.install(app);
  app.use(responseLogger);
  return app;
};

export default createApp();
