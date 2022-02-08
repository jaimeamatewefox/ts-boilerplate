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
            const getUserByEmailMock = jest.spyOn(usersRepo, 'getUserByEmail').mockResolvedValue({
                email: '__EMAIL__',
            } as never);

            const hashMock = jest.spyOn(bcrypt, 'hash').mockResolvedValue({
                password: '__PASSWORD__',
                number: 10,
            } as never);

            const createUserlMock = jest.spyOn(usersRepo, 'createUser').mockResolvedValue({
                password: '__PASSWORD__',
                email: '__EMAIL__',
                token: '__TOKEN__',
            } as never);

            const ret = await usersRepo.createUser({
                email: '__EMAIL__',
                password: '__PASSWORD__',
                token: '__TOKEN__',
            });

            expect(getUserByEmailMock.mock.calls).toEqual([]);
            expect(hashMock.mock.calls).toEqual([]);
            expect(createUserlMock.mock.calls).toEqual([
                [
                    {
                        password: '__PASSWORD__',
                        email: '__EMAIL__',
                        token: '__TOKEN__',
                    },
                ],
            ]);
        });
    });

    describe('loginUser', () => {
        it('should send an access token if the password is correct', async () => {
            const getUserByEmailMock = jest.spyOn(usersRepo, 'getUserByEmail').mockResolvedValue({
                email: '__EMAIL__',
            } as never);
            const compareMock = jest.spyOn(bcrypt, 'compare').mockResolvedValue({
                userPassword: '__PASSWORD__',
                foundUserPassword: '__PASSWORD__',
            } as never);
            const signMock = jest.spyOn(jwt, 'sign').mockReturnValue({
                id: '__ID__',
                email: '__EMAIL__',
            } as never);
            const saveUserTokenMock = jest.spyOn(usersRepo, 'saveUserToken').mockResolvedValue({
                id: new Types.ObjectId('000000000000000000000000'),
                password: '__PASSWORD__',
                email: '__EMAIL__',
                token: '__TOKEN__',
            } as never);

            const ret = await usersService.loginUser({
                email: '__EMAIL__',
                password: '__PASSWORD__',
                token: '__TOKEN__',
            });

            expect(ret).toEqual({
                token: {
                    id: '__ID__',
                    email: '__EMAIL__',
                },
            });

            expect(getUserByEmailMock.mock.calls).toEqual([['__EMAIL__']]);
            expect(compareMock.mock.calls).toEqual([['__PASSWORD__', undefined]]);
            expect(signMock.mock.calls).toEqual([
                [
                    { email: '__EMAIL__', id: undefined },
                    'tokenKey',
                    {
                        expiresIn: '10h',
                    },
                ],
            ]);
            expect(saveUserTokenMock.mock.calls).toEqual([
                [
                    undefined,
                    {
                        id: '__ID__',
                        email: '__EMAIL__',
                    },
                ],
            ]);
        });
    });
});
