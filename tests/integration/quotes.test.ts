import { promises } from 'dns';
import request from 'supertest';
import app from '../../src/app';
import * as quotesRepo from '../../src/quotes/quotesRepo';
import axios, { AxiosRequestConfig } from 'axios';
import { any } from 'joi';

describe('/quotes', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('GET /quotes', () => {
        it('should retrieve the list of quotes', async () => {
            const getQuotesMock = jest.spyOn(quotesRepo, 'getQuotes').mockResolvedValue([
                {
                    id: '1234',
                    author: 'Lorca',
                    en: 'aaa',
                },
                {
                    id: '1234',
                    author: 'Lorca',
                    en: 'aaa',
                },
            ] as never);

            const { status, body } = await request(app).get('/quotes').set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 200,
                body: [
                    {
                        id: '1234',
                        author: 'Lorca',
                        en: 'aaa',
                    },
                    {
                        id: '1234',
                        author: 'Lorca',
                        en: 'aaa',
                    },
                ],
            });
            expect(getQuotesMock.mock.calls).toEqual([[]]);
        });

        it('should retrieve the list of authors', async () => {
            const getQuoteByAuthorMock = jest.spyOn(quotesRepo, 'getQuoteByAuthor').mockResolvedValue([
                {
                    author: 'Ken_Olsen',
                },
            ] as never);

            const { status, body } = await request(app)
                .get('/quotes?author=Ken_Olsen')
                .set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 200,
                body: [{ author: 'Ken_Olsen' }],
            });
            expect(getQuoteByAuthorMock.mock.calls).toEqual([['Ken_Olsen']]);
        });
    });

    describe('GET /quotes/:id', () => {
        it('should retrieve the list of quotes by id', async () => {
            const getQuoteByIdMock = jest.spyOn(quotesRepo, 'getQuoteById').mockResolvedValue({
                id: '__ID__',
                author: '__AUTHOR__',
                en: '__EN__',
            });

            const { status, body } = await request(app).get('/quotes/__ID__').set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 200,
                body: {
                    id: '__ID__',
                    author: '__AUTHOR__',
                    en: '__EN__',
                },
            });
            expect(getQuoteByIdMock.mock.calls).toEqual([['__ID__']]);
        });

        it('should thrown an error 404 id the id does not exists', async () => {
            const mockError = {
                response: {
                    status: 404,
                    statusText: 'Quote not found',
                },
            };

            const getQuoteByIdMock = jest.spyOn(quotesRepo, 'getQuoteById').mockRejectedValue(mockError);

            const { status, body } = await request(app).get('/quotes/__ID__').set('Authorization', 'Bearer __TOKEN__');

            expect({ status, body }).toEqual({
                status: 404,
                body: {
                    message: 'Quote not found',
                },
            });
            expect(getQuoteByIdMock.mock.calls).toEqual([['__ID__']]);
        });
    });
});
