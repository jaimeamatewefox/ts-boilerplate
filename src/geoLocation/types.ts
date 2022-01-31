// my API retrieves:
interface IAddress {
    street: string;
    streetNumber: string;
    town: string;
    postalCode: string;
    country: string;
}
//return value required
interface IGeo {
    latitude: string;
    longitude: string;
}

// external API return value
interface INominatinApiResponse {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    boundingbox: string[];
    lat: string;
    lon: string;
    display_name: string;
    class: string;
    type: string;
    importance: number;
}

export { IAddress, IGeo, INominatinApiResponse };
