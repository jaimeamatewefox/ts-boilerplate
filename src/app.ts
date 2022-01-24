import express from 'express';

// Create Express server
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


console.log('Hello!!!');

export default app;
