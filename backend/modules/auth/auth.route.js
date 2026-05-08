import express from 'express';
import { signInController,signUpController } from './auth.controller.js';
export const authRouter = express.Router();

authRouter.post('/register',signUpController)
authRouter.post('/login', signInController)

