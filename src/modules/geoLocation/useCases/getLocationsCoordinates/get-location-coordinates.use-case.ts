
import { IGeoLocationRepo } from "../../repos/geoLocation.repo";
import { IGeoLocation } from "../../domain/geoLocation.entity";
import { IGetLocationDTO } from "../../dto";

export interface IGetLocationCoordinatesUseCase {
    execute(query: IGetLocationDTO): Promise<IGeoLocation | null>;
}

export class GetLocationCoordinatesUseCase implements IGetLocationCoordinatesUseCase {
    private locationRepo: IGeoLocationRepo;

    constructor (locationRepo: IGeoLocationRepo) {
        this.locationRepo = locationRepo;
    }

    public async execute(query: IGetLocationDTO): Promise<IGeoLocation | null> {
        const location = await this.locationRepo.getLocationCoordinates(query);
        
        return location;
        
    }

}