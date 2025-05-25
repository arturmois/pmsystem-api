import express from 'express';
import cors from 'cors';
import router from './router'

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', router.authRoutes);

app.use('/project', router.projectRoutes)

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export { app }; 