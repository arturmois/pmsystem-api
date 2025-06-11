import { Router } from 'express';
import userRouter from './userRouter';
import projectRouter from './projectRouter';
import budgetRouter from './budgetRouter'
import ticketRouter from "./ticketRouter";
import AuthMiddleware from '../shared/middlewares/AuthMiddleware';
import saleRouter from './saleRouter';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/projects', AuthMiddleware.execute, projectRouter);
routes.use('/budgets', AuthMiddleware.execute, budgetRouter)
routes.use("/tickets", AuthMiddleware.execute, ticketRouter);
routes.use("/sales", AuthMiddleware.execute, saleRouter);
export default routes;
