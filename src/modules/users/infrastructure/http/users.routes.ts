import { Router } from 'express';
import { getUsersController } from '../../useCases/getUsers';
import { registerUserController } from '../../useCases/registerUser';
import { loginUserControler } from '../../useCases/loginUser';

const router = Router();

router.get('/', async (req, res) => getUsersController.execute(req, res));
router.post('/register', async (req, res) => registerUserController.execute(req, res));
router.post('/login', async (req, res) => loginUserControler.execute(req, res));

export { router as userRouter };
