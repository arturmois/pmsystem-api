import { Router } from "express";
import userRouter from "./userRouter";
import projectRouter from "./projectRouter";
import ticketRouter from "./ticketRouter";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/projects", projectRouter);
routes.use("/tickets", ticketRouter);

export default routes;
