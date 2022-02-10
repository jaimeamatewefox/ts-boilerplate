import * as usersService from '../../src/user/userService';
import userModel from '../../src/models/user.models';
import request from 'supertest';
import app from '../../src/app';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';

jest.mock('../../src/helpers/db.ts');

describe('/user', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('POST/login', () => {
        it('should return a token for the login if the password is correct', async () => {
            const hashedPassword = '$2b$10$KXtNTDYa5wLnFhcKGpaRyeRD1T.SsRkVR/Dk5MDP3Tm92eM4BkBty';
            const findOneMock = jest.spyOn(userModel, 'findOne').mockResolvedValue({
                _id: new Types.ObjectId('000000000000000000000000'),
                password: hashedPassword,
                email: '__EMAIL__',
            } as never);
            const findByIdAndUpdateMock = jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValue({
                _id: new Types.ObjectId('000000000000000000000000'),
                password: hashedPassword,
                email: '__EMAIL__',
                token: '__TOKEN__',
            } as never);
            const signMock = jest.spyOn(jwt, 'sign').mockReturnValue('__TOKEN__' as never);

            const { status, body } = await request(app).post('/auth/login/').send({ email: '__EMAIL__', password: '1234' });

            expect({ status, body }).toEqual({
                status: 200,
                body: { token: '__TOKEN__'},
            });
            expect(findOneMock.mock.calls).toEqual([[{ email: '__EMAIL__' }]]);
            expect(findByIdAndUpdateMock.mock.calls).toEqual([
                [new Types.ObjectId('000000000000000000000000'), { token: '__TOKEN__' }],
            ]);
            expect(signMock.mock.calls).toEqual([
                [
                    { email: '__EMAIL__', id: new Types.ObjectId('000000000000000000000000') },
                    'tokenKey',
                    {
                        expiresIn: '10h',
                    },
                ],
            ]);
        });

        it('should return a 404 status code if the password is invalid', async () => {
            const findOneMock = jest.spyOn(userModel, 'findOne').mockResolvedValue(null);
            const { status, body } = await request(app)
                .post('/auth/login/')
                .send({ email: '__EMAIL__', password: '__PASSWORD__' });

            expect({ status, body }).toEqual({
                status: 404,
                body: { message: 'User not found' },
            });

            expect(findOneMock.mock.calls).toEqual([[{ email: '__EMAIL__' }]]);
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
