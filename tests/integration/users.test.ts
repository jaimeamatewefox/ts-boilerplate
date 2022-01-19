import request from 'supertest';
import app from '../../src/app';
import * as usersRepo from '../../src/user/usersRepo';
import { Types } from 'mongoose';

describe('/users', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('GET /users', () => {
        it('should retrieve the list of users', async () => {
            const getUsersMock = jest.spyOn(usersRepo, 'getUsers').mockResolvedValue([
                {
                    username: 'JaimeAmate',
                    email: 'jaime@jaime.com',
                },
                {
                    username: 'RosaBerned',
                    email: 'rosa@rosa.com',
                },
            ] as never);

            const { status, body } = await request(app).get('/users').set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 200,
                body: [
                    {
                        username: 'JaimeAmate',
                        email: 'jaime@jaime.com',
                    },
                    {
                        username: 'RosaBerned',
                        email: 'rosa@rosa.com',
                    },
                ],
            });
            expect(getUsersMock.mock.calls).toEqual([[]]);
        });
    });

    describe('GET /users/:id', () => {
        it('should return the user by id', async () => {
            const getUserByIdMock = jest.spyOn(usersRepo, 'getUserById').mockResolvedValue({
                id: new Types.ObjectId('000000000000000000000000'),
            } as never);

            const { status, body } = await request(app)
                .get('/users/000000000000000000000000')
                .set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 200,
                body: {
                    id: '000000000000000000000000',
                },
            });
            expect(getUserByIdMock.mock.calls).toEqual([['000000000000000000000000']]);
        });

        it('should return a 404 status code if the user is not found', async () => {
            const getUserByIdMock = jest.spyOn(usersRepo, 'getUserById').mockResolvedValue(null);

            const { status, body } = await request(app).get('/users/__ID__').set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 404,
                body: { message: 'user not found' },
            });
            expect(getUserByIdMock.mock.calls).toEqual([['__ID__']]);
        });
    });

    describe('POST /users', () => {/////
        it('should return a 400 error if the body is ill-formatted', async () => {
            const { status, body } = await request(app)
                .post('/users/')
                .send({ username: '__USERNAME__' })
                .set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 400,
                body: { message: 'validation error' },
            });
        });

        it('should create a new user', async () => {
            const createUserMock = jest
                .spyOn(usersRepo, 'createUser')
                .mockResolvedValue({ username: '__USERNAME__', email: 'email@email.com' } as never);

            const { status, body } = await request(app)
                .post('/users')
                .send({ username: '__USERNAME__', email: 'email@email.com' })
                .set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 200,
                body: { username: '__USERNAME__', email: 'email@email.com' },
            });
            expect(createUserMock.mock.calls).toEqual([[{ username: '__USERNAME__', email: 'email@email.com' }]]);
        });
    });

    describe('PUT /users/:id', () => {
        it('should return a 400 error if the body is ill-formatted', async () => {
            const { status, body } = await request(app)
                .put('/users/_id')
                .send({ name: '__USERNAME__' })
                .set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 400,
                body: { message: 'validation error' },
            });
        });

        it('should update an existing user', async () => {
            const updateUserMock = jest.spyOn(usersRepo, 'updateUser').mockResolvedValue({
                _id: new Types.ObjectId('000000000000000000000000'),
                username: '__USERNAME__',
                email: 'email@email.com',
            } as never);

            const { status, body } = await request(app)
                .put('/users/000000000000000000000000')
                .send({ username: '__USERNAME__', email: 'email@email.com' })
                .set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 200,
                body: { _id: '000000000000000000000000', username: '__USERNAME__', email: 'email@email.com' },
            });
            expect(updateUserMock.mock.calls).toEqual([
                ['000000000000000000000000', { username: '__USERNAME__', email: 'email@email.com' }],
            ]);
        });

        it('should return a 404 error if the user is not found', async () => {
            const updateUserMock = jest.spyOn(usersRepo, 'updateUser').mockResolvedValue(null);

            const { status, body } = await request(app)
                .put('/users/__ID__')
                .send({ username: '__USERNAME__', email: 'email@email.com' })
                .set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 404,
                body: {},
            });
            expect(updateUserMock.mock.calls).toEqual([]);
        });
    });

    describe('DELETE /users/:id', () => {
        it('should delete an existing user', async () => {
            const deleteUserMock = jest.spyOn(usersRepo, 'deleteUser').mockResolvedValue({
                _id: '000000000000000000000000',
                username: '__USERNAME__',
                email: '__EMAIL__',
            } as never);

            const { status, body } = await request(app)
                .delete('/users/000000000000000000000000')
                .send()
                .set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 200,
                body: { _id: '000000000000000000000000', username: '__USERNAME__', email: '__EMAIL__' },
            });
            expect(deleteUserMock.mock.calls).toEqual([['000000000000000000000000']]);
        });

        it('should return a 404 error if the user is not found', async () => {
            const deleteUserMock = jest.spyOn(usersRepo, 'deleteUser').mockResolvedValue(null);

            const { status, body } = await request(app)
                .delete('/users/__ID__')
                .send()
                .set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 404,
                body: { message: 'user not found' },
            });
            expect(deleteUserMock.mock.calls).toEqual([['__ID__']]);
        });
    });
});
