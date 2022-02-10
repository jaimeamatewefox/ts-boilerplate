import { Router } from 'express';
import * as userService from './userService';
import { IUser } from './userTypes';

const router = Router();

router.post('/login', async (req, res) => {
    const user: IUser = {
        email: req.body.email,
        password: req.body.password,
    };

    try {
        const token = await userService.loginUser(user);
        return res.send(token);
    } catch (error: any) {
        switch (error.message) {
            case 'User not found':
                res.status(404).send({ message: 'User not found' });
                break;
            case 'Invalid password':
                res.status(400).send({ message: 'Invalid password' });
                break;
            default:
                res.sendStatus(500);
        }
    }
});

// create user
router.post('/register', async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };

    try {
        const newUser = await userService.createUser(user);

        return res.send(newUser);
    } catch (error) {
        res.status(500).send('server error');
    }
});

export { router as userRouter };
