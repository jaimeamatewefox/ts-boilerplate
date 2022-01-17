import { IUserDocument } from './../models/user.models';
import { IUser } from './types';
import * as usersRepo from '../user/usersRepo';

async function getUsers(username: string): Promise<IUserDocument[] | IUser | null> {
    if (!username) {
        return usersRepo.getUsers();
    }

    return usersRepo.getUserByUsername(username);
}

async function createUser(user: { username: string; email: string }): Promise<IUserDocument[] | IUser | null> {
    return usersRepo.createUser(user);
}

async function getUserById(id: string): Promise<IUserDocument[] | IUser | null> {
    if (!id) {
        return null;
    }

    return usersRepo.getUserById(id);
}

async function updateUser(id: string, newUser: IUser): Promise<IUserDocument[] | IUser | null> {
    if (!id) {
        return null;
    }
    return usersRepo.updateUser(id, newUser);
}

async function deleteUser(id: string): Promise<IUserDocument | IUser | null> {
    const userIdIsFound = usersRepo.getUserById(id);

    if (!userIdIsFound) {
        return null;
    }

    return usersRepo.deleteUser(id);
}

export { getUsers, createUser, getUserById, updateUser, deleteUser };
