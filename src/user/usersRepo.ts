import userModel, { IUserDocument } from '../models/user.models';
import { IUser } from './types';

async function getUsers(): Promise<IUserDocument[]> {
    return userModel.find();
}

async function getUserById(id: string): Promise<IUserDocument | null> {
    return userModel.findById(id);
}

async function getUserByUsername(username: string): Promise<IUserDocument | null> {
    return userModel.findOne({ username });
}

async function createUser(user: { username: string; email: string }): Promise<IUserDocument> {
    return userModel.create(user);
}

async function updateUser(id: string, newUser: IUser): Promise<IUserDocument | null> {
    return userModel.findByIdAndUpdate(id, newUser, { new: true });
}

async function deleteUser(id: string): Promise<IUserDocument | null> {
    return userModel.findByIdAndDelete(id);
}

export { getUsers, getUserById, getUserByUsername, createUser, updateUser, deleteUser };
