import { IAddress, IGeo } from './types';
import * as geoRepo from './geoRepo';

export async function getLocationCoordinates(query: IAddress): Promise<IGeo> {
    const location = await geoRepo.getLocations(query);

    if (location.length === 0) {
        throw Error('Location not found');
    }
    const locationData = location[0];

    const externalApiResponse: IGeo = { latitude: locationData.lat, longitude: locationData.lon };

    return externalApiResponse;
}
