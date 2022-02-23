import { GetLocationCoordinatesUseCase } from './../../get-location-coordinates.use-case';
import { NominatinGeoLocationRepo } from '../../../../repos';
import { GetLocationCoordinatesErrors } from '../../get-location-coordinates.errors';

describe('#modules#geoLocation#GetLocationCoordinatesUseCase', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('#execute', () => {
        it('should throw the error LocationCoordinatesNotFound if there are not locations', async () => {
            const repo = new NominatinGeoLocationRepo();
            const useCase = new GetLocationCoordinatesUseCase(repo);

            const getLocationCoordinatesMock = jest.spyOn(repo, 'getLocationCoordinates').mockResolvedValue(null);

            const query = {
                street: '__STREET__',
                streetNumber: '__STREENUMBER__',
                town: '__TOWN__',
                postalCode: '__POSTALCODE__',
                country: '__COUNTRY__',
            };

            await expect(() => useCase.execute(query)).rejects.toThrow(
                GetLocationCoordinatesErrors.LocationCoordinatesNotFound,
            );

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
            const useCase = new GetLocationCoordinatesUseCase(repo);

            const getLocationCoordinatesMock = jest
                .spyOn(repo, 'getLocationCoordinates')
                .mockResolvedValue({ latitude: '__LATITUDE__', longitude: '__LONGITUDE__' } as never);

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
