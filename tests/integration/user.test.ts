import * as usersService from '../../src/user/userService';
import request from 'supertest';
import app from '../../src/app';
import { Types } from 'mongoose';

describe('/user', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('POST/login', () => {
        it('should return a token for the login if the password is correct', async () => {
            const loginUserMock = jest.spyOn(usersService, 'loginUser').mockResolvedValue({ token: '__TOKEN__' });

            const { status, body } = await request(app)
                .post('/auth/login/')
                .send({ email: '__EMAIL__', password: '__PASSWORD__' });

            expect({ status, body }).toEqual({
                status: 200,
                body: { token: '__TOKEN__' },
            });
            expect(loginUserMock.mock.calls).toEqual([[{ email: '__EMAIL__', password: '__PASSWORD__' }]]);
        });

        it('should return a 404 status code if the password is invalid', async () => {
            const loginUserMock = jest
                .spyOn(usersService, 'loginUser')
                .mockRejectedValue({ message: 'Invalid password' });

            const { status, body } = await request(app)
                .post('/auth/login/')
                .send({ email: '__EMAIL__', password: '__PASSWORD__' });

            expect({ status, body }).toEqual({
                status: 400,
                body: { message: 'Invalid password' },
            });

            expect(loginUserMock.mock.calls).toEqual([[{ email: '__EMAIL__', password: '__PASSWORD__' }]]);
        });
    });

    describe('POST/register', () => {
        it('should create an user', async () => {
            const createUserMock = jest.spyOn(usersService, 'createUser').mockResolvedValue({
                _id: new Types.ObjectId('000000000000000000000000'),
                password: '__PASSWORD__',
                email: '__EMAIL__',
            } as never);

            const { status, body } = await request(app)
                .post('/auth/register/')
                .send({ email: '__EMAIL__', password: '__PASSWORD__' });

            expect({ status, body }).toEqual({
                status: 200,
                body: {
                    _id: '000000000000000000000000',
                    password: '__PASSWORD__',
                    email: '__EMAIL__',
                },
            });
            expect(createUserMock.mock.calls).toEqual([[{ email: '__EMAIL__', password: '__PASSWORD__' }]]);
        });

        it('should return a 500 status code if there is a server error', async () => {
            const createUserMock = jest
                .spyOn(usersService, 'createUser')
                .mockRejectedValue({ message: 'server error' });

            const { status, body } = await request(app)
                .post('/auth/register/')
                .send({ email: '__EMAIL__', password: '__PASSWORD__' });

            expect({ status, body }).toEqual({
                status: 500,
                body: {},
            });
            expect(createUserMock.mock.calls).toEqual([[{ email: '__EMAIL__', password: '__PASSWORD__' }]]);
        });
    });
});
