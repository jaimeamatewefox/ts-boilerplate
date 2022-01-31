import dotenv from 'dotenv';
import app from './app';
import * as dbHelpers from './helpers/db';

// Start express server

dotenv.config();

const PORT = process.env.PORT || 3000;

dbHelpers.connect();
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
