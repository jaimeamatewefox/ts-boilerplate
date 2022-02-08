import { Types } from 'mongoose';
import userModel from '../../src/models/user.models';
import * as userRepo from '../../src/user/userRepo';

jest.mock('../../src/helpers/db.ts');

describe('usersRepo#geoRepo', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getUsers', () => {
        it('should retrieve the list of users', async () => {
            const findMock = jest.spyOn(userModel, 'find').mockResolvedValue([
                {
                    id: new Types.ObjectId('000000000000000000000000'),
                    password: '__PASSWORD__',
                    email: '__EMAIL__',
                    token: '__TOKEN__',
                } as never,
            ]);

            const ret = await userRepo.getUsers({
                email: '_EMAIL_',
                password: '_PASSWORD_',
            });

            expect(ret).toEqual([
                {
                    id: new Types.ObjectId('000000000000000000000000'),
                    password: '__PASSWORD__',
                    email: '__EMAIL__',
                    token: '__TOKEN__',
                },
            ]);

            expect(findMock.mock.calls).toEqual([
                [
                    {
                        email: '_EMAIL_',
                        password: '_PASSWORD_',
                    },
                ],
            ]);
        });
    });

    describe('createUser', () => {
        it('should create an user', async () => {
            const createMock = jest.spyOn(userModel, 'create').mockResolvedValue({
                password: '__PASSWORD__',
                email: '__EMAIL__',
            } as never);

            const ret = await userRepo.createUser({
                email: '_EMAIL_',
                password: '_PASSWORD_',
            });

            expect(ret).toEqual({
                password: '__PASSWORD__',
                email: '__EMAIL__',
            });

            expect(createMock.mock.calls).toEqual([[{ email: '_EMAIL_', password: '_PASSWORD_' }]]);
        });
    });

    describe('getUserByEmail', () => {
        it('should get an user by email', async () => {
            const findOneMock = jest.spyOn(userModel, 'findOne').mockResolvedValue({
                password: '__PASSWORD__',
                email: '__EMAIL__',
                token: '__TOKEN__',
            } as never);

            const ret = await userRepo.getUserByEmail('_EMAIL_');

            expect(ret).toEqual({
                password: '__PASSWORD__',
                email: '__EMAIL__',
                token: '__TOKEN__',
            });

            expect(findOneMock.mock.calls).toEqual([[{ email: '_EMAIL_' }]]);
        });
    });

    describe('saveUserToken', () => {
        it('should save the user token in the db', async () => {
            const findByIdAndUpdateMock = jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValue({
                id: new Types.ObjectId('000000000000000000000000'),
                password: '__PASSWORD__',
                email: '__EMAIL__',
                token: '__TOKEN__',
            } as never);

            const ret = await userRepo.saveUserToken('__USER_ID__', '__TOKEN__');

            expect(ret).toEqual({
                id: new Types.ObjectId('000000000000000000000000'),
                password: '__PASSWORD__',
                email: '__EMAIL__',
                token: '__TOKEN__',
            });

            expect(findByIdAndUpdateMock.mock.calls).toEqual([['__USER_ID__', { token: '__TOKEN__' }]]);
        });
    });
});
