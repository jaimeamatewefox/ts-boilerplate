import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { LoginUserUseCase } from './../../login-user.use-case';
import { MongoUserRepo } from '../../../../repos';
import { LoginUserErrors } from '../../login-user.errors';
import bcrypt from 'bcrypt';

describe('#modules#users#loginUserUseCase', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('#execute', () => {
        it('should login the user', async () => {
            const repo = new MongoUserRepo();
            const useCase = new LoginUserUseCase(repo);
            const getUserByEmailMock = jest.spyOn(repo, 'getUserByEmail').mockResolvedValue({
                _id: new Types.ObjectId('000000000000000000000000'),
                password: '__PASSWORD__',
                email: '__EMAIL__',
                token: '__TOKEN__',
            } as never);
            const compareMock = jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
            const signMock = jest.spyOn(jwt, 'sign').mockReturnValue('__TOKEN__' as never);
            const saveUserTokenMock = jest.spyOn(repo, 'saveUserToken').mockResolvedValue({
                _id: new Types.ObjectId('000000000000000000000000'),
                password: '__PASSWORD__',
                email: '__EMAIL__',
                token: '__TOKEN__',
            } as never);

            const ret = await useCase.execute({ password: '__PASSWORD__', email: '__EMAIL__' });

            expect(ret).toEqual({
                token: '__TOKEN__',
            });

            expect(getUserByEmailMock.mock.calls).toEqual([['__EMAIL__']]);
            expect(compareMock.mock.calls).toEqual([['__PASSWORD__', '__PASSWORD__']]);
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

        it('should show the error UserNotFound if there is no user', async () => {
            const repo = new MongoUserRepo();
            const useCase = new LoginUserUseCase(repo);
            const getUserByEmailMock = jest.spyOn(repo, 'getUserByEmail').mockResolvedValue(null);

            const response = { password: '__PASSWORD__', email: '__EMAIL__', token: '__TOKEN__' };

            await expect(() => useCase.execute(response)).rejects.toThrow(LoginUserErrors.UserNotFound);

            expect(getUserByEmailMock.mock.calls).toEqual([['__EMAIL__']]);
        });

        it('should show the error UserInvalidPassword if there password is invalid', async () => {
            const repo = new MongoUserRepo();
            const useCase = new LoginUserUseCase(repo);
            const getUserByEmailMock = jest
                .spyOn(repo, 'getUserByEmail')
                .mockResolvedValue({ password: '__PASSWORD__', email: '__EMAIL__', token: '__TOKEN__' } as never);
            const compareMock = jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

            const response = {
                password: '__PASSWORD__',
                email: '__EMAIL__',
            };

            await expect(() => useCase.execute(response)).rejects.toThrow(LoginUserErrors.UserInvalidPassword);

            expect(getUserByEmailMock.mock.calls).toEqual([['__EMAIL__']]);
            expect(compareMock.mock.calls).toEqual([['__PASSWORD__', '__PASSWORD__']]);
        });
    });
});
