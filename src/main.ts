import express from 'express';
import cors from 'cors';
import AuthRouter from './routes/authRouter';
import UserRouter from './routes/userRouter';
import TicketRouter from './routes/ticketRouter';
import { PORT } from "./config/env";
import Dependencies from './dependencies';

const app = express();
app.use(cors());
app.use(express.json());

new Dependencies();

const userRouter = new UserRouter();
const authRouter = new AuthRouter();
const ticketRouter = new TicketRouter();

app.use('/api/auth', authRouter.getRouter());
app.use('/api/users', userRouter.getRouter());
app.use('/api/ticket', ticketRouter.getRouter());

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});