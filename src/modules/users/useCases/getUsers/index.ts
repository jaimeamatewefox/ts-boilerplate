import { MongoUserRepo } from '../../repos/index';
import GetUsersUseCase from './get-users.use-case';
import GetUsersController from './get-users.controller';

const repo = new MongoUserRepo();
const useCase = new GetUsersUseCase(repo);
const getUsersController = new GetUsersController(useCase);

export { getUsersController };