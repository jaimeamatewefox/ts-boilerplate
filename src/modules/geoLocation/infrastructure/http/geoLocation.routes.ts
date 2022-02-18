import { Router } from 'express';
import { getLocationCoordinatesController } from './../../useCases/getLocationsCoordinates/index';
import { verifyToken } from '../../../../middlewares/auth';
import { validateObject } from '../../../../middlewares/validateObject';

const router = Router();

router.get('/', verifyToken, validateObject, async (req, res) => getLocationCoordinatesController.execute(req, res));

export { router as userRouter };
