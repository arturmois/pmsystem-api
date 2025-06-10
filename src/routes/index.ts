import { Router } from 'express';
import userRouter from './userRouter';
import projectRouter from './projectRouter';
import budgetRouter from './budgetRouter'
import ticketRouter from "./ticketRouter";


const routes = Router();

routes.use('/users', userRouter);
routes.use('/project', projectRouter);
routes.use('/budget', budgetRouter)
routes.use("/tickets", ticketRouter);

export default routes;
