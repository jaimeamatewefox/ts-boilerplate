import { Router, Request, Response } from 'express';
import * as usersService from './service';
//import * as usersRepo from './usersRepo';
import { validateSchema } from '../middlewares';

const router = Router();

//ENDPOINTS

// list of users
router.get('/', async (req, res) => {
    const users = await usersService.getUsers();

    return res.send(users);
});

// Get users by id
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    const user = usersService.getUserById(userId);

    if (!user) {
        return res.status(404).send({ message: 'user not found' });
    }

    return res.send(user);
});

// Update an user
router.put('/:id', validateSchema, (req, res) => {
    const newUser = {
        id: req.params.id,
        username: req.body.username,
        email: req.body.email,
    };

    const user = usersService.updateUser(req.params.id, newUser);

    if (!user) {
        return res.status(404).send({ message: 'user not found' });
    }

    return res.send(user);
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

router.delete('/:id', async (req, res) => {
    const userDeleted = await usersService.deleteUser(req.params.id);

    if (!userDeleted) {
        return res.status(404).send({ message: 'user not found' });
    }

    return res.status(200).send(userDeleted);
});

export { router as userRouter };
