import { MongoUserRepo } from '../../repos';
import RegisterUserController from './register-user.controller';
import RegisterUserUseCase from './register-user.use-case';

const repo = new MongoUserRepo();
const useCase = new RegisterUserUseCase(repo);
const registerUserController = new RegisterUserController(useCase);

export { registerUserController };
