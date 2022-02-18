import { NominatinGeoLocationRepo } from './../../../../repos/geoLocation.nominatin-repo';
import { IGeoLocationRepo } from './../../../../repos/geoLocation.repo';
import { GetLocationCoordinatesController } from './../../get-location-controller';

describe('#modules#geoLocation#GetLocationCoordinatesController', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('#execute', () => {
        it('should return the latitude an longitude coordinates', async () => {});
    });
});
