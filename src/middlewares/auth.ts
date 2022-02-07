import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

// Authorization: Bearer <token>

function verifyToken(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers['authorization'];

    if (!bearerToken) {
        return res.status(401).send({ msg: 'Token required for authoritation' });
    }

    try {
        jwt.verify(bearerToken, config.tokenKey);
        next();
    } catch (error) {
        res.status(401).send({ msg: 'Token not valid' });
    }
}

export { verifyToken };
