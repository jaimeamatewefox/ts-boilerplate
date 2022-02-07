import express from 'express';
import { locationRouter } from './geoLocation/controller';
import { userRouter } from './user/userController';

// Create Express server
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/location', locationRouter);
app.use('/auth', userRouter);

export default app;
