import express, { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/unauthorized.error";

export const auth = (app: express.Express) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (token) {
      console.log('[TOKEN]: ', token);
      return next();
    }

    next(new UnauthorizedError());
  });
}