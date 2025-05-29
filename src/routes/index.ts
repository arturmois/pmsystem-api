import { Router, Request, Response, RequestHandler } from 'express';
import userRouter from './userRouter';
import projectRouter from './projectRoutes';

const routes = Router();

routes.get('/health', (_, res) => {
  res.json({ message: "OK", status: 200 });
});

routes.use('/users', userRouter);
routes.use('/projects', projectRouter);

export default routes;

