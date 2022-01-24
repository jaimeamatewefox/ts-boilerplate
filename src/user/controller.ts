import { Router, Request, Response } from 'express';
import * as usersService from './service';
import { validateSchema } from '../middlewares';
import { IUser } from './types';

const router = Router();

//ENDPOINTS

// list of users
router.get('/', async (req, res) => {
    const users = await usersService.getUsers();

    return res.send(users);
});

// Get users by id
router.get('/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await usersService.getUserById(userId);
        res.send(user);
    } catch (error) {
        switch (error.message) {
            case 'user not found':
                res.status(404).send({ message: error.message });
                break;
            case 'invalid id':
                res.status(400).send({ message: error.message });
                break;
            default:
                res.sendStatus(500);
        }
    }
});

// Update an user
router.put('/:id', validateSchema, async (req, res) => {
    const newUser: IUser = {
        username: req.body.username,
        email: req.body.email,
    };

    try {
        const user = await usersService.updateUser(req.params.id, newUser);
        return res.send(user);
    } catch (error) {
        switch (error.message) {
            case 'id is not valid':
                res.status(400).send({ message: 'id is not valid' });
                break;
            case 'user not found':
                res.status(404).send({ message: 'user not found' });
                break;
            default:
                res.sendStatus(500);
        }
    }

    return newUser;
});

// Create an user
router.post('/', validateSchema, async (req: Request, res: Response) => {
    const user = {
        username: req.body.username,
        email: req.body.email,
    };

    const newUser = await usersService.createUser(user);

    return res.send(newUser);
});

// Delete an user
router.delete('/:id', async (req, res) => {
    try {
        const userDeleted = await usersService.deleteUser(req.params.id);
        return res.status(200).send(userDeleted);
    } catch (error) {
        switch (error.message) {
            case 'id is not valid':
                res.status(400).send({ message: 'id is not valid' });
                break;
            case 'user not found':
                res.status(404).send({ message: 'user not found' });
                break;
            default:
                res.sendStatus(500);
        }
    }
});

export { router as userRouter };
