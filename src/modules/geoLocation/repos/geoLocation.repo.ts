import { IGeoLocation } from '../domain';
import { IGetLocationDTO } from "../dto";

 export interface IGeoLocationRepo {
     getLocationCoordinates(query:IGetLocationDTO): Promise<IGeoLocation | null>;

}

