import { MongoUserRepo } from '../../../../repos';
import { RegisterUserUseCase } from './../../register-user.use-case';
import { RegisterUserErrors } from './../../register-user.errors';
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';

describe('#modules#users#registerUserUseCase', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('#execute', () => {
        it('should register the user', async () => {
            const repo = new MongoUserRepo();
            const useCase = new RegisterUserUseCase(repo);
            const getUserByEmailMock = jest.spyOn(repo, 'getUserByEmail').mockResolvedValue(null);
            const hashMock = jest.spyOn(bcrypt, 'hash').mockResolvedValue('__ENCRIPTEDPASSWORD__' as never);
            const createUserMock = jest.spyOn(repo, 'createUser').mockResolvedValue({
                _id: new Types.ObjectId('000000000000000000000000'),
                password: '__ENCRIPTEDPASSWORD__',
                email: '__EMAIL__',
            } as never);

            const ret = await useCase.execute({ email: '__EMAIL__', password: '__PASSWORD__' });

            expect(ret).toEqual({
                _id: new Types.ObjectId('000000000000000000000000'),
                email: '__EMAIL__',
                password: '__ENCRIPTEDPASSWORD__',
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

        it('should show the error UserAlreadyRegistered if the user already exists ', async () => {
            const repo = new MongoUserRepo();
            const useCase = new RegisterUserUseCase(repo);
            const getUserByEmailMock = jest.spyOn(repo, 'getUserByEmail').mockResolvedValue({
                _id: new Types.ObjectId('000000000000000000000000'),
                password: '__PASSWORD__',
                email: '__EMAIL__',
                token: '__TOKEN__',
            } as never);

            const response = {
                _id: new Types.ObjectId('000000000000000000000000'),
                password: '__PASSWORD__',
                email: '__EMAIL__',
                token: '__TOKEN__',
            };

            await expect(() => useCase.execute(response)).rejects.toThrow(RegisterUserErrors.UserAlreadyRegistered);

            expect(getUserByEmailMock.mock.calls).toEqual([['__EMAIL__']]);
        });
    });
});
