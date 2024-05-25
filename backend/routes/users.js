import express from 'express';
import { Router } from 'express';
import { signin, signup } from '../controllers/users.js'

const userRouter = express.Router();

userRouter.post('/signin', signin)
userRouter.post('/signup', signup)

export default userRouter