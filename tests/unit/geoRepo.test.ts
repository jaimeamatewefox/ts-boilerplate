import * as geoRepo from '../../src/geoLocation/geoRepo';
import axios from 'axios';

jest.mock('../../src/helpers/db.ts');

describe('geoLocation#geoRepo', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getLocations', () => {
        it('should retrieve the locations', async () => {
            const getAxiosMock = jest.spyOn(axios, 'get').mockResolvedValue({
                data: [
                    {
                        place_id: 84848848,
                        licence: '__LICENCE__',
                        osm_type: '__OSM_TYPE__',
                        osm_id: 9898909,
                        boundingbox: ['__BOUNDINGBOX__', '__BOUNDINGBOX__'],
                        lat: '789900004',
                        lon: '432565677',
                    },
                ],
            });

            const ret = await geoRepo.getLocations({
                street: '_street_',
                streetNumber: '_streetNumber_',
                town: '_town_',
                postalCode: '_postalCode_',
                country: '_country_',
            });

            expect(ret).toEqual([
                {
                    place_id: 84848848,
                    licence: '__LICENCE__',
                    osm_type: '__OSM_TYPE__',
                    osm_id: 9898909,
                    boundingbox: ['__BOUNDINGBOX__', '__BOUNDINGBOX__'],
                    lat: '789900004',
                    lon: '432565677',
                },
            ]);

            expect(getAxiosMock.mock.calls).toEqual([
                [
                    'https://nominatim.openstreetmap.org/search?street=_street_&city=_town_&county=_town_&state=_town_&country=_country_&postalCode=_postalCode_&format=json&limit=1',
                ],
            ]);
        });
    });
});
