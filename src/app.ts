import express from 'express';
import { locationRouter } from './geoLocation/controller';
import { userRouter } from './modules/users/infrastructure/http/users.routes';

// Create Express server
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/location', locationRouter);
app.use('/auth', userRouter);

export default app;
