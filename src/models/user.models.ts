import { Schema, Document, model } from 'mongoose';
import { IUser } from '../user/types';

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

export default model<IUser>('User', userSchema);
