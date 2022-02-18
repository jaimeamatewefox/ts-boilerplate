import { GetLocationCoordinatesUseCase } from './../../get-location-coordinates.use-case';
import { NominatinGeoLocationRepo } from '../../../../repos';

describe('#modules#geoLocation#GetLocationCoordinatesUseCase', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('#execute', () => {
        it('should return null if there are not locations', async () => {
            const repo = new NominatinGeoLocationRepo();
            const getLocationCoordinatesMock = jest.spyOn(repo, 'getLocationCoordinates').mockResolvedValue(null);

            const useCase = new GetLocationCoordinatesUseCase(repo);
            const query = {
                street: '__STREET__',
                streetNumber: '__STREENUMBER__',
                town: '__TOWN__',
                postalCode: '__POSTALCODE__',
                country: '__COUNTRY__',
            };

            const response = await useCase.execute(query);
            expect(response).toBeNull();
            expect(getLocationCoordinatesMock.mock.calls).toEqual([
                [
                    {
                        street: '__STREET__',
                        streetNumber: '__STREENUMBER__',
                        town: '__TOWN__',
                        postalCode: '__POSTALCODE__',
                        country: '__COUNTRY__',
                    },
                ],
            ]);
        });

        it('should return the latitude an longitude coordinates', async () => {
            const repo = new NominatinGeoLocationRepo();
            const getLocationCoordinatesMock = jest
                .spyOn(repo, 'getLocationCoordinates')
                .mockResolvedValue({ latitude: '__LATITUDE__', longitude: '__LONGITUDE__' } as never);

            const useCase = new GetLocationCoordinatesUseCase(repo);
            const query = {
                street: '__STREET__',
                streetNumber: '__STREENUMBER__',
                town: '__TOWN__',
                postalCode: '__POSTALCODE__',
                country: '__COUNTRY__',
            };

            const response = await useCase.execute(query);

            expect(response).toEqual({ latitude: '__LATITUDE__', longitude: '__LONGITUDE__' });
            expect(getLocationCoordinatesMock.mock.calls).toEqual([
                [
                    {
                        street: '__STREET__',
                        streetNumber: '__STREENUMBER__',
                        town: '__TOWN__',
                        postalCode: '__POSTALCODE__',
                        country: '__COUNTRY__',
                    },
                ],
            ]);
        });
    });
});
