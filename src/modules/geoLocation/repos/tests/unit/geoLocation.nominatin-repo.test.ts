import axios from 'axios';
import { NominatinGeoLocationRepo } from '../..';
import jwt from 'jsonwebtoken';

describe('#modules#geoLocation#geoLocationNominatinRepo', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('#getLocationCoordinates', () => {
        it('should return null if there are not locations', async () => {
            const repo = new NominatinGeoLocationRepo();
            const getMock = jest.spyOn(axios, 'get').mockResolvedValue({ data: [] });

            const ret = await repo.getLocationCoordinates({
                street: 'Fuencarral',
                streetNumber: '120',
                town: 'Madrid',
                postalCode: '28006',
                country: 'Spain',
            });

            expect(ret).toBeNull;

            expect(getMock.mock.calls).toEqual([
                [
                    'https://nominatim.openstreetmap.org/search?street=Fuencarral&city=Madrid&county=Madrid&state=Madrid&country=Spain&postalCode=28006&format=json&limit=1',
                ],
            ]);
        });
        it('should te latitude and longitude coordinates ', async () => {
            const repo = new NominatinGeoLocationRepo();

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

            const ret = await repo.getLocationCoordinates({
                street: '__STREET__',
                streetNumber: '__STREENUMBER__',
                town: '__TOWN__',
                postalCode: '__POSTALCODE__',
                country: '__COUNTRY__',
            });

            expect(ret).toEqual({
                latitude: '__LATITUDE__',
                longitude: '__LONGITUDE__',
            });
            expect(getMock.mock.calls).toEqual([
                [
                    'https://nominatim.openstreetmap.org/search?street=__STREET__&city=__TOWN__&county=__TOWN__&state=__TOWN__&country=__COUNTRY__&postalCode=__POSTALCODE__&format=json&limit=1',
                ],
            ]);
        });
    });
});
