import { Request, Response, NextFunction } from 'express';

function auth(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization === 'Bearer __TOKEN__') {
        next();
    } else {
        res.status(403).send('sorry you need authentication code');
    }
}

export { auth };
