import * as geoRepo from '../../src/geoLocation/geoRepo';
import request from 'supertest';
import app from '../../src/app';

describe('/location', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('GET/location', () => {
        it('should retrieve the latitude an longitude coordinates', async () => {
            const getLocationsMock = jest.spyOn(geoRepo, 'getLocations').mockResolvedValue([
                {
                    place_id: 84848848,
                    licence: '__LICENCE__',
                    osm_type: '__OSM_TYPE__',
                    osm_id: 9898909,
                    boundingbox: ['__BOUNDINGBOX__', '__BOUNDINGBOX__'],
                    lat: '__LATITUDE__',
                    lon: '__LONGITUDE__',
                },
            ] as never);

            const { status, body } = await request(app)
                .get('/location?streetNumber=39&town=Madrid&country=spain&street=serrano&postalCode=28001')
                .send();

            expect({ status, body }).toEqual({
                status: 200,
                body: {
                    latitude: '__LATITUDE__',
                    longitude: '__LONGITUDE__',
                },
            });

            expect(getLocationsMock.mock.calls).toEqual([
                [
                    {
                        street: 'serrano',
                        streetNumber: '39',
                        town: 'Madrid',
                        postalCode: '28001',
                        country: 'spain',
                    },
                ],
            ]);
        });

        it('should return a 404 status code if the location is not found', async () => {
            const getLocationsMock = jest.spyOn(geoRepo, 'getLocations').mockResolvedValue([] as never);

            const { status, body } = await request(app)
                .get('/location?streetNumber=39&town=Madrid&country=spain&street=serrano&postalCode=28001')
                .send();

            expect({ status, body }).toEqual({
                status: 404,
                body: { message: 'Location not found' },
            });
            expect(getLocationsMock.mock.calls).toEqual([
                [
                    {
                        street: 'serrano',
                        streetNumber: '39',
                        town: 'Madrid',
                        postalCode: '28001',
                        country: 'spain',
                    },
                ],
            ]);
        });
    });
});
