import { LoginUserUseCase } from './login-user.use-case';
import { MongoUserRepo } from '../../repos';
import { LoginUserController } from './login-user.controller';

const repo = new MongoUserRepo();
const useCase = new LoginUserUseCase(repo);
const loginUserControler = new LoginUserController(useCase);

export { loginUserControler };
