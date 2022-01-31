import * as geoRepo from '../../src/geoLocation/geoRepo';
import * as geoService from '../../src/geoLocation/service';

describe('user#service', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getLocationCoordinates', () => {
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

            const ret = await geoService.getLocationCoordinates({
                street: '_street_',
                streetNumber: '_streetNumber_',
                town: '_town_',
                postalCode: '_street_',
                country: '_postalCode_',
            });

            expect(ret).toEqual({
                latitude: '__LATITUDE__',
                longitude: '__LONGITUDE__',
            });

            expect(getLocationsMock.mock.calls).toEqual([
                [
                    {
                        street: '_street_',
                        streetNumber: '_streetNumber_',
                        town: '_town_',
                        postalCode: '_street_',
                        country: '_postalCode_',
                    },
                ],
            ]);
        });
    });
});
