import { GetLocationCoordinatesUseCase } from './get-location-coordinates.use-case';
import { NominatinGeoLocationRepo } from '../../repos';
import { GetLocationCoordinatesController } from './get-location-controller';

const repo = new NominatinGeoLocationRepo();
const useCase = new GetLocationCoordinatesUseCase(repo);
const getLocationCoordinatesController = new GetLocationCoordinatesController(useCase);

export { getLocationCoordinatesController };
