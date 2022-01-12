import { IUser, users } from './types';
import * as usersRepo from './usersRepo';
import { ICreateUser } from './types';

function getUsers(username: string): IUser[] | IUser | void {
    if (!username) {
        return usersRepo.getUsers();
    }

    return usersRepo.getUserByUsername(username);
}

function createUser(user: ICreateUser) {
    return usersRepo.createUser(user);
}

function getUserById(id: string): IUser[] | IUser | void {
    if (!id) {
        return undefined;
    }

    return usersRepo.getUserById(id);
}

function updateUser(userId: string, newUser: IUser): IUser | void {
        const user = userId;
        if (!user) {
            return undefined;
        }
        return usersRepo.updateUser(user, newUser);
}

function deleteUser(userId: string): boolean {
    const userIndex = usersRepo.getUserById(userId);

    if (userIndex) {
        return false;
    }

    return usersRepo.deleteUser(userId);
}

export { getUsers, createUser, getUserById, updateUser, deleteUser };
