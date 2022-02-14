import { Schema, Document, model } from 'mongoose';
import { IUser } from '../user/userTypes';

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
});

const userModel = model<IUser>('User', userSchema);

export default userModel;
