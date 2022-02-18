import userModel, { IUserDocument } from '../models/user.models';
import { IUser } from '../user/userTypes';

async function getUsers(user: IUser): Promise<IUserDocument[]> {
    return userModel.find(user);
}

async function createUser(user: IUser): Promise<IUserDocument> {
    return userModel.create(user);
}

async function getUserByEmail(email: string): Promise<IUserDocument | null> {
    return userModel.findOne({ email });
}

// This fuction stores the user token

async function saveUserToken(userId: string, token: string): Promise<IUserDocument | null> {
    return userModel.findByIdAndUpdate(userId, { token });
}

export { getUsers, createUser, getUserByEmail, saveUserToken };
