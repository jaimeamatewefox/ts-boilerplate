import express from 'express';
import { locationRouter } from './geoLocation/controller';

// Create Express server
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/location', locationRouter);


export default app;
