import axios from 'axios';
import { IGeoLocationRepo } from './geoLocation.repo';
import { INominatinApiResponseDTO } from '../dto';
import { IGeoLocation } from '../domain';
import { IGetLocationDTO } from '../dto';

export class NominatinGeoLocationRepo implements IGeoLocationRepo {
    public async getLocationCoordinates(query: IGetLocationDTO): Promise<IGeoLocation | null> {
        const url = `https://nominatim.openstreetmap.org/search?street=${query.street}&city=${query.town}&county=${query.town}&state=${query.town}&country=${query.country}&postalCode=${query.postalCode}&format=json&limit=1`;
        const response = await axios.get<INominatinApiResponseDTO[]>(url);

        if (!response.data.length) {
            return null;
        }

        const location = response.data[0];

        const coordinates: IGeoLocation = { latitude: location.lat, longitude: location.lon };

        return coordinates;
    }
}
