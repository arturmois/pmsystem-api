import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface AuthenticatedRequest extends Request {
  userId: string;
}

export default class AuthMiddleware {
  public static execute = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
      res.status(401).json({ error: 'Token error' });
      return;
    }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
      res.status(401).json({ error: 'Token malformatted' });
      return;
    }
    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) {
        res.status(401).json({ error: 'Token invalid' });
        return;
      }
      (req as AuthenticatedRequest).userId = decoded.id;
      next();
    });
  }
}