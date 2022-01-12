import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

// Middlewares
export function isAuth(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization === 'Bearer __TOKEN__') {
        next();
    } else {
        res.status(403).send('sorry you need authentication code');
    }
}

export async function validateSchema(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
        id: Joi.string(),
        username: Joi.string().min(3).max(25).required(),
        email: Joi.string().min(3).max(25).required(),
    });
    try {
        await schema.validateAsync(req.body);
    } catch (err) {
        res.status(400).send({ message: 'validation error' });
    }
    next();
}

export default { isAuth, validateSchema };
