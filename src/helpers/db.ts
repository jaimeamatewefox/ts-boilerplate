import mongoose from 'mongoose';

let database: mongoose.Connection;
const DATABASE_URI = 'mongodb://localhost:27017';

export function connect() {
    if (database) {
        return;
    }

    mongoose.connect(DATABASE_URI);

    database = mongoose.connection;

    database.once('open', async () => {
        console.log('Successfully connection to Database');
    });

    database.on('error', () => {
        console.log('Error connecting to MongoDB database');
    });
}
export function disconnect() {
    if (!database) {
        return;
    }

    mongoose.disconnect();
}
