import express, { type NextFunction, type Request, type Response } from "express";
import 'express-async-errors';
import cors from "cors";
import { PORT } from "./config/env";
import InitializeDependencies from "./shared/di/InitializeDependencies";
import routes from "./routes";
import rateLimiter from "./shared/middlewares/rateLimiter";
import ErrorHandleMiddleware from "./shared/middlewares/ErrorHandleMiddleware";

function initializeApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  InitializeDependencies.initialize();

  app.use(rateLimiter);

  app.use("/api", routes);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    ErrorHandleMiddleware.execute(err, req, res, next);
  });

  return app;
}

const app = initializeApp();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
