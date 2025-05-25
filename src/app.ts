import express from 'express';
import cors from 'cors';
import { userRoutes } from './routes/user.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export { app }; 