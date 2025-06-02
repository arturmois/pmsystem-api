import express from 'express';
import cors from 'cors';
import { PORT } from "./config/env";
import { ZodError } from 'zod';
import InitializeDependencies from './shared/di/InitializeDependencies';
import routes from './routes'

function initializeApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  InitializeDependencies.initialize();

  app.use(routes)

  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof ZodError) {
      res.status(400).json({ error: err.errors });
    } else {
      res.status(500).json({ error: err.message });
    }
  });


  return app;
}

const app = initializeApp();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
