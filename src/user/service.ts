import { IUserDocument } from './../models/user.models';
import { IUser } from './types';
import * as usersRepo from '../user/usersRepo';

async function getUsers(): Promise<IUserDocument[]> {
    return usersRepo.getUsers();
}

async function createUser(user: { username: string; email: string }): Promise<IUserDocument | null> {
    return usersRepo.createUser(user);
}

async function getUserById(id: string): Promise<IUserDocument | null> {
    if (!id) {
        return null;
    }

    return usersRepo.getUserById(id);
}

async function updateUser(id: string, newUser: IUser): Promise<IUserDocument | null> {
    if (!id) {
        return null;
    }
    return usersRepo.updateUser(id, newUser);
}

async function deleteUser(id: string): Promise<IUserDocument | null> {
    return usersRepo.deleteUser(id);
}

export { getUsers, createUser, getUserById, updateUser, deleteUser };
