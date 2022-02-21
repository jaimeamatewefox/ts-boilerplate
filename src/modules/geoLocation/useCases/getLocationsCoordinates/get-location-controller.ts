import { Request, Response } from 'express';
import { IGetLocationCoordinatesUseCase } from './get-location-coordinates.use-case';
import { IGetLocationDTO } from '../../dto';
import { GetLocationCoordinatesErrors } from './get-location-coordinates.errors';

export class GetLocationCoordinatesController {
    private getLocationCoordinatesUseCase: IGetLocationCoordinatesUseCase;

    constructor(getLocationCoordinatesUseCase: IGetLocationCoordinatesUseCase) {
        this.getLocationCoordinatesUseCase = getLocationCoordinatesUseCase;
    }

    public async execute(req: Request, res: Response) {
        const getLocationObject: IGetLocationDTO = {
            street: req.query.street as string,
            streetNumber: req.query.streetNumber as string,
            town: req.query.town as string,
            postalCode: req.query.postalCode as string,
            country: req.query.country as string,
        };
        try {
            const getLocationCoordinatesResponse = await this.getLocationCoordinatesUseCase.execute(getLocationObject);

            res.send(getLocationCoordinatesResponse);
        } catch (error: any) {
            switch (error.constructor) {
                case GetLocationCoordinatesErrors.LocationCoordinatesNotFound:
                    res.status(404).send({ message: error.message });
                    break;
                default:
                    res.sendStatus(500);
            }
        }
    }
}
