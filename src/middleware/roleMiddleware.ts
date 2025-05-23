import { NextFunction, Request, Response } from "express";

export const roleMiddleware = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.tipo || !allowedRoles.includes(req.user.tipo)) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    next();
  };
};