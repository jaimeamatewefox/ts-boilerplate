import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import userModel from '../../../../dao/do/user.do';
import request from 'supertest';
import app from '../../../../../../app';

describe('#modules#users#loginUserUseCase#tests#integration', () => {
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

            const { status, body } = await request(app)
                .post('/auth/login/')
                .send({ email: '__EMAIL__', password: '1234' });

            expect({ status, body }).toEqual({
                status: 200,
                body: { token: '__TOKEN__' },
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

        it('should return a 404 status code if user is not found', async () => {
            const findOneMock = jest.spyOn(userModel, 'findOne').mockResolvedValue(null);
            const { status, body } = await request(app)
                .post('/auth/login/')
                .send({ email: '__EMAIL__', password: '__PASSWORD__' });

            expect({ status, body }).toEqual({
                status: 404,
                body: { message: 'User __EMAIL__ not found' },
            });

            expect(findOneMock.mock.calls).toEqual([[{ email: '__EMAIL__' }]]);
        });
    });
});
