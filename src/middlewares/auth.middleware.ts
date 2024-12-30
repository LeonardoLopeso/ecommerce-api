import express, { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { DecodedIdToken, getAuth } from "firebase-admin/auth";

export const auth = (app: express.Express) => {
  app.use(async (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "POST" && req.url.endsWith("/auth/login")) {
      return next();
    }

    const token = req.headers.authorization?.split("Bearer ")[1];

    if (token) {
      try {
        const decodeIdToken: DecodedIdToken = await getAuth().verifyIdToken(token, true)
        console.log('[DECODED_ID_TOKEN]: ', decodeIdToken);
        return next();
      } catch (error) {
        next(new UnauthorizedError());
      }
    }

    next(new UnauthorizedError());
  });
}