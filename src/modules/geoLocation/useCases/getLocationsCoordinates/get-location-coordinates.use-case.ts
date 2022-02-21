import { IGeoLocationRepo } from '../../repos/geoLocation.repo';
import { IGeoLocation } from '../../domain/geoLocation.entity';
import { IGetLocationDTO } from '../../dto';
import { GetLocationCoordinatesErrors } from './get-location-coordinates.errors';

export interface IGetLocationCoordinatesUseCase {
    execute(query: IGetLocationDTO): Promise<IGeoLocation>;
}

export class GetLocationCoordinatesUseCase implements IGetLocationCoordinatesUseCase {
    private locationRepo: IGeoLocationRepo;

    constructor(locationRepo: IGeoLocationRepo) {
        this.locationRepo = locationRepo;
    }

    public async execute(query: IGetLocationDTO): Promise<IGeoLocation> {
        const location = await this.locationRepo.getLocationCoordinates(query);

        if (!location) {
            throw new GetLocationCoordinatesErrors.LocationCoordinatesNotFound();
        }

        return location;
    }
}
