import request from 'supertest';
import app from '../../src/app';
import * as usersRepo from '../../src/user/usersRepo';

describe('/users', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('GET /users', () => {
        it('should retrieve the list of users', async () => {
            const getUsersMock = jest.spyOn(usersRepo, 'getUsers').mockReturnValue([
                {
                    id: '1',
                    username: 'JaimeAmate',
                    email: 'jaime@jaime.com',
                },
                {
                    id: '2',
                    username: 'RosaBerned',
                    email: 'rosa@rosa.com',
                },
            ]);

            const { status, body } = await request(app).get('/users').set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 200,
                body: [
                    {
                        id: '1',
                        username: 'JaimeAmate',
                        email: 'jaime@jaime.com',
                    },
                    {
                        id: '2',
                        username: 'RosaBerned',
                        email: 'rosa@rosa.com',
                    },
                ],
            });
            expect(getUsersMock.mock.calls).toEqual([[]]);
        });

        it('should return a user by username', async () => {
            const getUserByUsernameMock = jest
                .spyOn(usersRepo, 'getUserByUsername')
                .mockReturnValue({ id: '__ID__', username: '__USERNAME__', email: 'email@email.com' });

            const { status, body } = await request(app)
                .get('/users?username=__USERNAME__')
                .set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 200,
                body: { id: '__ID__', username: '__USERNAME__', email: 'email@email.com' },
            });
            expect(getUserByUsernameMock.mock.calls).toEqual([['__USERNAME__']]);
        });

        it('should return a 404 status error if the username is not found', async () => {
            const getUserByUsernameMock = jest.spyOn(usersRepo, 'getUserByUsername').mockReturnValue(undefined);

            const { status, body } = await request(app)
                .get('/users?username=__USERNAME__')
                .set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 404,
                body: { message: 'user not found' },
            });
            expect(getUserByUsernameMock.mock.calls).toEqual([['__USERNAME__']]);
        });
    });

    describe('GET /users/:id', () => {
        it('should return the user', async () => {
            const getUserByIdMock = jest
                .spyOn(usersRepo, 'getUserById')
                .mockReturnValue({ id: '__ID__', username: '__USERNAME__', email: 'email@email.com' });

            const { status, body } = await request(app).get('/users/__ID__').set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 200,
                body: { id: '__ID__', username: '__USERNAME__', email: 'email@email.com' },
            });
            expect(getUserByIdMock.mock.calls).toEqual([['__ID__']]);
        });

        it('should return a 404 status code if the user is not found', async () => {
            const getUserByIdMock = jest.spyOn(usersRepo, 'getUserById').mockReturnValue(undefined);

            const { status, body } = await request(app).get('/users/__ID__').set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 404,
                body: { message: 'user not found' },
            });
            expect(getUserByIdMock.mock.calls).toEqual([['__ID__']]);
        });
    });

    describe('POST /users', () => {
        it('should return a 400 error if the body is ill-formatted', async () => {
            const { status, body } = await request(app)
                .post('/users')
                .send({ name: '__USERNAME__' })
                .set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 400,
                body: { message: 'validation error' },
            });
        });

        it('should create a new user', async () => {
            const createUserMock = jest
                .spyOn(usersRepo, 'createUser')
                .mockReturnValue({ id: '__ID__', username: '__USERNAME__', email: 'email@email.com' });

            const { status, body } = await request(app)
                .post('/users')
                .send({ username: '__USERNAME__', email: 'email@email.com' })
                .set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 200,
                body: { id: '__ID__', username: '__USERNAME__', email: 'email@email.com' },
            });
            expect(createUserMock.mock.calls).toEqual([[{ username: '__USERNAME__', email: 'email@email.com' }]]);
        });
    });

    describe('PUT /users/:id', () => {
        it('should return a 400 error if the body is ill-formatted', async () => {
            const { status, body } = await request(app)
                .put('/users/__ID__')
                .send({ name: '__USERNAME__' })
                .set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 400,
                body: { message: 'validation error' },
            });
        });

        it('should update an existing user', async () => {
            const updateUserMock = jest
                .spyOn(usersRepo, 'updateUser')
                .mockReturnValue({ id: '__ID__', username: '__USERNAME__', email: 'email@email.com' });

            const { status, body } = await request(app)
                .put('/users/__ID__')
                .send({ id: '__ID__', username: '__USERNAME__', email: 'email@email.com' })
                .set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 200,
                body: { id: '__ID__', username: '__USERNAME__', email: 'email@email.com' },
            });
            expect(updateUserMock.mock.calls).toEqual([
                ['__ID__', { id: '__ID__', username: '__USERNAME__', email: 'email@email.com' }],
            ]);
        });

        it('should return a 404 error if the user is not found', async () => {
            const updateUserMock = jest.spyOn(usersRepo, 'updateUser').mockReturnValue(undefined);

            const { status, body } = await request(app)
                .put('/users/__ID__')
                .send({ id: '__ID__', username: '__USERNAME__', email: 'email@email.com' })
                .set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 404,
                body: { message: 'user not found' },
            });
            expect(updateUserMock.mock.calls).toEqual([
                ['__ID__', { id: '__ID__', username: '__USERNAME__', email: 'email@email.com' }],
            ]);
        });
    });

    describe('DELETE /users/:id', () => {
        it('should delete an existing user', async () => {
            const deleteUserMock = jest.spyOn(usersRepo, 'deleteUser').mockReturnValue(true);

            const { status, body } = await request(app)
                .delete('/users/__ID__')
                .send()
                .set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 204,
                body: {},
            });
            expect(deleteUserMock.mock.calls).toEqual([['__ID__']]);
        });

        it('should return a 404 error if the user is not found', async () => {
            const deleteUserMock = jest.spyOn(usersRepo, 'deleteUser').mockReturnValue(false);

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
