import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

async function validateObject(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
        street: Joi.string().min(3).max(25).required(),
        streetNumber: Joi.string().min(1).max(25).required(),
        town: Joi.string().min(3).max(25).required(),
        postalCode: Joi.string().min(3).max(25).required(),
        country: Joi.string().min(3).max(25).required(),
    });

    try {
        await schema.validateAsync(req.query);

        next();
    } catch (err) {
        res.status(400).send({ message: 'validation error' });
    }
}

export { validateObject };
