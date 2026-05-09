import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { authRouter } from './modules/auth/auth.route.js';
import { userRouter } from './modules/user/user.route.js';

export const app = express();
dotenv.config();
const corsOptions = {
    origin: process.env.FRONTEND_URL, // Update this to match your frontend URL
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


