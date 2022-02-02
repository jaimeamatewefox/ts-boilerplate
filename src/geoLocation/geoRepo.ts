import axios from 'axios';
import * as locationModel from '../models/location.models';
import { IAddress, IGeo, INominatinApiResponse } from './types';

async function getLocations(query: IAddress): Promise<INominatinApiResponse[]> {
    const url = `https://nominatim.openstreetmap.org/search?street=${query.street}&city=${query.town}&county=${query.town}&state=${query.town}&country=${query.country}&postalCode=${query.postalCode}&format=json&limit=1`;
    const response = await axios.get<INominatinApiResponse[]>(url);

    return response.data;
}

export { getLocations };
