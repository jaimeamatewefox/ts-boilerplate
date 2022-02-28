import { IGetLocationDTO } from './../../../../dto/get-location.dto';
import axios from 'axios';
import request from 'supertest';
import app from '../../../../../../app';
import jwt from 'jsonwebtoken';


describe('#modules#geoLocation#getLocationCoordinatesUseCase#tests#integration', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('GET/users', () => {
        it('should return the latitude and longitude coordinates', async () => {
            const signMock = jest.spyOn(jwt, 'verify').mockReturnValue('__TOKEN__' as never);
            const getMock = jest.spyOn(axios, 'get').mockResolvedValue({
                data: [
                    {
                        place_id: 84848848,
                        licence: '__LICENCE__',
                        osm_type: '__OSM_TYPE__',
                        osm_id: 9898909,
                        boundingbox: ['__BOUNDINGBOX__', '__BOUNDINGBOX__'],
                        lat: '__LATITUDE__',
                        lon: '__LONGITUDE__',
                    },
                ],
            });

            const query: IGetLocationDTO = {
                street: 'Fuencarral',
                streetNumber: '120',
                town: 'Madrid',
                postalCode: '28006',
                country: 'Spain',
            };

            const { status, body } = await request(app)
                .get('/location?street=Fuencarral&streetNumber=120&town=Madrid&postalCode=28006&country=Spain')
                .set('Authorization', 'Bearer __TOKEN__')
                .send();

            expect({ status, body }).toEqual({
                status: 200,
                body: {
                    latitude: '__LATITUDE__',
                    longitude: '__LONGITUDE__',
                },
            });

            expect(getMock.mock.calls).toEqual([
                [
                    'https://nominatim.openstreetmap.org/search?street=Fuencarral&city=Madrid&county=Madrid&state=Madrid&country=Spain&postalCode=28006&format=json&limit=1',
                ],
            ]);
            expect(signMock.mock.calls).toEqual([['Bearer __TOKEN__', 'tokenKey']]);
        });
    });
});
