import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import * as usersRepo from '../../src/user/userRepo';
import * as usersService from '../../src/user/userService';
import bcrypt from 'bcrypt';

describe('user#service', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            const getUserByEmailMock = jest.spyOn(usersRepo, 'getUserByEmail').mockResolvedValue(null);

            const hashMock = jest.spyOn(bcrypt, 'hash').mockResolvedValue('__ENCRIPTEDPASSWORD__' as never);

            const createUserMock = jest.spyOn(usersRepo, 'createUser').mockResolvedValue({
                _id: new Types.ObjectId('000000000000000000000000'),
                password: '__ENCRIPTEDPASSWORD__',
                email: '__EMAIL__',
            } as never);

            const ret = await usersService.createUser({
                email: '__EMAIL__',
                password: '__PASSWORD__',
            });

            expect(ret).toEqual({
                _id: new Types.ObjectId('000000000000000000000000'),
                password: '__ENCRIPTEDPASSWORD__',
                email: '__EMAIL__',
            });

            expect(getUserByEmailMock.mock.calls).toEqual([['__EMAIL__']]);
            expect(hashMock.mock.calls).toEqual([['__PASSWORD__', 10]]);
            expect(createUserMock.mock.calls).toEqual([
                [
                    {
                        password: '__ENCRIPTEDPASSWORD__',
                        email: '__EMAIL__',
                    },
                ],
            ]);
        });
    });

    describe('loginUser', () => {
        it('should send an access token if the password is correct', async () => {
            const getUserByEmailMock = jest.spyOn(usersRepo, 'getUserByEmail').mockResolvedValue({
                _id: new Types.ObjectId('000000000000000000000000'),
                password: '__ENCRIPTEDPASSWORD__',
                email: '__EMAIL__',
            } as never);
            const compareMock = jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
            const signMock = jest.spyOn(jwt, 'sign').mockReturnValue('__TOKEN__' as never);
            const saveUserTokenMock = jest.spyOn(usersRepo, 'saveUserToken').mockResolvedValue({
                _id: new Types.ObjectId('000000000000000000000000'),
                password: '__ENCRIPTEDPASSWORD__',
                email: '__EMAIL__',
                token: '__TOKEN__',
            } as never);

            const ret = await usersService.loginUser({
                email: '__EMAIL__',
                password: '__PASSWORD__',
            });

            expect(ret).toEqual({
                token: '__TOKEN__',
            });

            expect(getUserByEmailMock.mock.calls).toEqual([['__EMAIL__']]);
            expect(compareMock.mock.calls).toEqual([['__PASSWORD__', '__ENCRIPTEDPASSWORD__']]);
            expect(signMock.mock.calls).toEqual([
                [
                    { email: '__EMAIL__', id: new Types.ObjectId('000000000000000000000000') },
                    'tokenKey',
                    {
                        expiresIn: '10h',
                    },
                ],
            ]);
            expect(saveUserTokenMock.mock.calls).toEqual([
                [new Types.ObjectId('000000000000000000000000'), '__TOKEN__'],
            ]);
        });
    });
});
