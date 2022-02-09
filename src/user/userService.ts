import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IUserDocument } from '../models/user.models';
import { IUser, IAuthenticate } from './userTypes';
import * as usersRepo from './userRepo';
import config from '../config';

async function createUser(user: IUser): Promise<IUserDocument | null> {
    const foundUser = await usersRepo.getUserByEmail(user.email);

    if (foundUser) {
        throw Error('user already exist');
    }

    const encryptedPassword = await bcrypt.hash(user.password, 10);

    const newUser: IUser = {
        email: user.email,
        password: encryptedPassword,
    };

    return usersRepo.createUser(newUser);
}
// This function checks if the password is correct, if so, a tonken sent

async function loginUser(user: IUser): Promise<IAuthenticate | null> {
    const foundUser = await usersRepo.getUserByEmail(user.email);

    if (!foundUser) {
        throw Error('User not found');
    }

    const isPasswordCorrect = await bcrypt.compare(user.password, foundUser.password);

    if (!isPasswordCorrect) {
        throw Error('invalid password');
    }

    const token = jwt.sign({ id: foundUser._id, email: foundUser.email }, config.tokenKey, {
        expiresIn: '10h',
    });

    await usersRepo.saveUserToken(foundUser._id, token);

    return { token };
}

export { createUser, loginUser };
