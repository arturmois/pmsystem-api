import { Router } from 'express';
import userRouter from './userRouter';
import projectRouter from './projectRouter';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/projects', projectRouter);

export default routes;