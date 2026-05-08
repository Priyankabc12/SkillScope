import express from 'express';
import { getUserProfileController,getUserJobsController,updateUserJobsController } from './user.controller.js';
export const userRouter = express.Router();

userRouter.get('/profile', getUserProfileController)
userRouter.get('/jobs', getUserJobsController)
userRouter.post('/jobs', updateUserJobsController)

