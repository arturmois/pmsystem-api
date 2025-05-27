import express from 'express';
import cors from 'cors';
import router from './router'

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Configuração de rotas
Object.keys(router).forEach((key) => {
  app.use(`/${key}`, router[key].routes);
});

// Middleware para tratamento de erros
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);

  const status = err.status || 500;
  const message = err.message || 'Erro interno no servidor';

  res.status(status).json({ status, message });
});

export { app }; 