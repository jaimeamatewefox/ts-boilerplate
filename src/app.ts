import express from 'express';
import { userRouter } from './user/controller';
import { quoteRouter } from './quotes/controller';
import { isAuth } from './middlewares';

// Create Express server
const app = express();

// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(isAuth);
app.use('/users', userRouter);
app.use('/quotes', quoteRouter);

export default app;
