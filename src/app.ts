import express, { Request, Response, NextFunction } from 'express';
import * as usersRepo from './usersRepo';
import * as Joi from 'joi';

// Create Express server
const app = express();

//Middlewares
function isAuth(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization === 'Bearer __TOKEN__') {
        next();
    } else {
        res.status(403).send('sorry you need authentication code');
    }
}

async function validateSchema(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(25).required(),
    });
    try {
        await schema.validateAsync(req.body);
    } catch (err) {
        res.status(400).send({ message: 'validation error' });
    }
    next();
}

// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(isAuth);


//endpoints
app.get('/users', (req, res) => {
    const username = req.query.username as string;

    if (!username) {
        const users = usersRepo.getUsers();
        return res.send(users);
    }

    const user = usersRepo.getUserByUsername(username);

    if (user === undefined) {
        return res.status(404).send({ message: 'user not found' });
    }

    return res.send(user);
});

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = usersRepo.getUserById(userId);

    if (!user) {
        return res.status(404).send({ message: 'user not found' });
    }

    return res.send(user);
});

app.post('/users', validateSchema, (req, res) => {
    const user = {
        username: req.body.username,
    };

    const newUser = usersRepo.createUser(user);

    return res.send(newUser);
});

app.put('/users/:id', validateSchema, (req, res) => {
    const newUser = {
        id: req.params.id,
        username: req.body.username,
        email: req.body.email,
    };

    const user = usersRepo.updateUser(req.params.id, newUser);

    if (!user) {
        return res.status(404).send({ message: 'user not found' });
    }

    return res.send(user);
});

app.delete('/users/:id', (req, res) => {
    const userDeleted = usersRepo.deleteUser(req.params.id);

    if (!userDeleted) {
        return res.status(404).send({ message: 'user not found' });
    }

    return res.status(204).send();
});

export default app;
