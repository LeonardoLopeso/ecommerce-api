import { Router } from "express";
import asyncHandler from "express-async-handler";
import { AuthController } from "../controllers/auth.controller";
import { authLoginSchema, authRecoverySchema } from "../models/use.model";
import { celebrate, Segments } from "celebrate";

export const authRoutes = Router();

authRoutes.post("/auth/login", 
    celebrate({ [Segments.BODY]: authLoginSchema }), 
    asyncHandler(AuthController.login)
);
authRoutes.post("/auth/recovery", 
    celebrate({ [Segments.BODY]: authRecoverySchema }), 
    asyncHandler(AuthController.recovery)
)