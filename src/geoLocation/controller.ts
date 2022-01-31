import { Router } from 'express';
import { validateObject } from '../middlewares';
import * as locationService from './service';
import { IAddress } from './types';

const router = Router();

router.get('/', validateObject, async (req, res) => {
    try {
        const queryObject: IAddress = {
            street: req.query.street as string,
            streetNumber: req.query.streetNumber as string,
            town: req.query.town as string,
            postalCode: req.query.postalCode as string,
            country: req.query.country as string,
        };

        const response = await locationService.getLocationCoordinates(queryObject);

        res.send(response);
    } catch (error) {
        switch (error.message) {
            case 'Location not found':
                res.status(404).send({ message: 'Location not found' });
                break;
            default:
                res.sendStatus(500);
        }
    }
});

export { router as locationRouter };
