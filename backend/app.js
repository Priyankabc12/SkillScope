import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { authRouter } from './modules/auth/auth.route.js';
import { userRouter } from './modules/user/user.route.js';

export const app = express();

const corsOptions = {
    origin: "http://localhost:5173", // Update this to match your frontend URL
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


