import { User } from "../models/use.model";

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}