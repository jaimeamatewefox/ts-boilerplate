import { isValidObjectId } from 'mongoose';
import { IUserDocument } from '../models/user.models';
import { IUser } from './types';
import * as usersRepo from '../user/usersRepo';

async function getUsers(): Promise<IUserDocument[]> {
    return usersRepo.getUsers();
}

async function createUser(user: { username: string; email: string }): Promise<IUserDocument | null> {
    return usersRepo.createUser(user);
}

async function getUserById(id: string): Promise<IUserDocument> {
    if (!isValidObjectId(id)) {
        throw new Error('invalid id');
    }

    const user = await usersRepo.getUserById(id);

    if (!user) {
        throw new Error('user not found');
    }

    return user;
}

async function updateUser(id: string, newUser: IUser): Promise<IUserDocument | null> {
    if (!isValidObjectId(id)) {
        throw new Error('id is not valid');
    }
    const user = await usersRepo.updateUser(id, newUser);

    if (!user) {
        throw new Error('user not found');
    }

    return user;
}

async function deleteUser(id: string): Promise<IUserDocument> {
    if (!isValidObjectId(id)) {
        throw new Error('id is not valid');
    }

    const user = await usersRepo.deleteUser(id);

    if (!user) {
        throw new Error('user not found');
    }

    return user;
}

export { getUsers, createUser, getUserById, updateUser, deleteUser };
