import { MongoUserRepo } from '../user.mongo-repo';
import { Types } from 'mongoose';
import userModel from '../../dao/do/user.do';

describe('#modules#users#userMongoRepo', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('#getAllUsers', () => {
        it('should retrieve the list of users', async () => {
            const repo = new MongoUserRepo();
            const findMock = jest.spyOn(userModel, 'find').mockResolvedValue([
                {
                    _id: new Types.ObjectId('000000000000000000000000'),
                    password: '__PASSWORD__',
                    email: '__EMAIL__',
                    token: '__TOKEN__',
                },
            ] as never);
            const ret = await repo.getAllUsers();

            expect(ret).toEqual([
                {
                    _id: new Types.ObjectId('000000000000000000000000'),
                    password: '__PASSWORD__',
                    email: '__EMAIL__',
                    token: '__TOKEN__',
                },
            ]);

            expect(findMock.mock.calls).toEqual([[]]);
        });
    });

    describe('#getUserByEmail', () => {
        it('should retrieve an user', async () => {
            const repo = new MongoUserRepo();
            const findOneMock = jest.spyOn(userModel, 'findOne').mockResolvedValue({
                _id: new Types.ObjectId('000000000000000000000000'),
                password: '__PASSWORD__',
                email: '__EMAIL__',
                token: '__TOKEN__',
            } as never);

            const ret = await repo.getUserByEmail('__EMAIL__');

            expect(ret).toEqual({
                _id: new Types.ObjectId('000000000000000000000000'),
                password: '__PASSWORD__',
                email: '__EMAIL__',
                token: '__TOKEN__',
            });
            expect(findOneMock.mock.calls).toEqual([[{ email: '__EMAIL__' }]]);
        });
        it('should retrieve null if an user in not found', async () => {
            const repo = new MongoUserRepo();
            const findOneMock = jest.spyOn(userModel, 'findOne').mockResolvedValue(null);

            const ret = await repo.getUserByEmail('__EMAIL__');

            expect(ret).toBeNull();
            expect(findOneMock.mock.calls).toEqual([[{ email: '__EMAIL__' }]]);
        });
    });

    describe('#createUser', () => {
        it('should create an user', async () => {
            const repo = new MongoUserRepo();
            const createMock = jest.spyOn(userModel, 'create').mockResolvedValue({
                _id: new Types.ObjectId('000000000000000000000000'),
                password: '__PASSWORD__',
                email: '__EMAIL__',
                token: '__TOKEN__',
            } as never);

            const ret = await repo.createUser({ password: '__PASSWORD__', email: '__EMAIL__' });

            expect(ret).toEqual({
                _id: new Types.ObjectId('000000000000000000000000'),
                password: '__PASSWORD__',
                email: '__EMAIL__',
                token: '__TOKEN__',
            });
            expect(createMock.mock.calls).toEqual([[{ password: '__PASSWORD__', email: '__EMAIL__' }]]);
        });
    });

    describe('#saveUserToken', () => {
        it('should save the user token in the database', async () => {
            const repo = new MongoUserRepo();
            const findByIdAndUpdateMock = jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValue({
                _id: new Types.ObjectId('000000000000000000000000'),
                password: '__PASSWORD__',
                email: '__EMAIL__',
                token: '__TOKEN__',
            } as never);

            const ret = await repo.saveUserToken('__ID__', '__TOKEN__');
            expect(ret).toEqual({
                _id: new Types.ObjectId('000000000000000000000000'),
                password: '__PASSWORD__',
                email: '__EMAIL__',
                token: '__TOKEN__',
            });
            expect(findByIdAndUpdateMock.mock.calls).toEqual([['__ID__', { token: '__TOKEN__' }]]);
        });
        it('should retrieve null if an user id in not found', async () => {
            const repo = new MongoUserRepo();
            const findByIdAndUpdateMock = jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValue(null);

            const ret = await repo.saveUserToken('__ID__', '__TOKEN__');
            
            expect(ret).toBeNull();
            expect(findByIdAndUpdateMock.mock.calls).toEqual([['__ID__', { token: '__TOKEN__' }]]);
        });
    });
});
