import { Types } from 'mongoose';
import userModel from '../../src/models/user.models';
import * as usersRepo from '../../src/user/usersRepo';

describe('user#usersRepo', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getUsers', () => {
        it('should retrieve the list of users', async () => {
            const findMock = jest.spyOn(userModel, 'find').mockResolvedValue([
                {
                    id: new Types.ObjectId('000000000000000000000000'),
                    username: '__USERNAME__',
                    email: '__EMAIL__',
                } as never,
            ]);

            const ret = await usersRepo.getUsers();

            expect(ret).toEqual([
                {
                    id: new Types.ObjectId('000000000000000000000000'),
                    username: '__USERNAME__',
                    email: '__EMAIL__',
                },
            ]);

            expect(findMock.mock.calls).toEqual([[]]);
        });
    });

    describe('getUserById', () => {
        it('should retrieve an user by ID', async () => {
            const findByIdMock = jest.spyOn(userModel, 'findById').mockResolvedValue({
                _id: new Types.ObjectId('000000000000000000000000'),
            } as never);

            const ret = await usersRepo.getUserById('__Id__');

            expect(ret).toEqual({
                _id: new Types.ObjectId('000000000000000000000000'),
            });

            expect(findByIdMock.mock.calls).toEqual([['__Id__']]);
        });
    });

    describe('getUsersByUsername', () => {
        it('should retrieve an user by username', async () => {
            const findOneMock = jest.spyOn(userModel, 'findOne').mockResolvedValue({
                username: '__USERNAME__',
            } as never);

            const ret = await usersRepo.getUserByUsername('__USERNAME__');

            expect(ret).toEqual({
                username: '__USERNAME__',
            });

            expect(findOneMock.mock.calls).toEqual([[{ username: '__USERNAME__' }]]);
        });
    });

    describe('createUser', () => {
        it('should create an user', async () => {
            const createMock = jest.spyOn(userModel, 'create').mockResolvedValue({
                username: '__USERNAME__',
                email: '__email__',
            } as never);

            const ret = await usersRepo.createUser({ username: '__USERNAME__', email: '__email__' });

            expect(ret).toEqual({
                username: '__USERNAME__',
                email: '__email__',
            });

            expect(createMock.mock.calls).toEqual([[{ username: '__USERNAME__', email: '__email__' }]]);
        });
    });

    describe('updateUser', () => {
        it('should create an user', async () => {
            const findByIdAndUpdateMock = jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValue({
                _id: new Types.ObjectId('000000000000000000000000'),
                username: '__NEW_USERNAME__',
                email: '__NEW_EMAIL__',
            } as never);

            const ret = await usersRepo.updateUser('__ID__', {
                username: '__NEW_USERNAME__',
                email: '__NEW_EMAIL__',
            });

            expect(ret).toEqual({
                _id: new Types.ObjectId('000000000000000000000000'),
                username: '__NEW_USERNAME__',
                email: '__NEW_EMAIL__',
            });
            expect(findByIdAndUpdateMock.mock.calls).toEqual([
                [
                    '__ID__',
                    {
                        username: '__NEW_USERNAME__',
                        email: '__NEW_EMAIL__',
                    },
                    { new: true },
                ],
            ]);
        });
    });

    describe('deleteUser', () => {
        it('should delete an user', async () => {
            const findByIdAndDeleteMock = jest.spyOn(userModel, 'findByIdAndDelete').mockResolvedValue({
                _id: new Types.ObjectId('000000000000000000000000'),
            } as never);

            const ret = await usersRepo.deleteUser('__ID__');

            expect(ret).toEqual({
                _id: new Types.ObjectId('000000000000000000000000'),
            });

            expect(findByIdAndDeleteMock.mock.calls).toEqual([['__ID__']]);
        });
    });
});
