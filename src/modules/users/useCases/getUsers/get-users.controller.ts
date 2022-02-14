import { Request, Response } from 'express';
import { IGetUsersUseCase } from './get-users.use-case';

class GetUsersController {
    private getUsersUseCase: IGetUsersUseCase;

    constructor(getUsersUseCase: IGetUsersUseCase) {
        this.getUsersUseCase = getUsersUseCase;
    }

    public async execute(req: Request, res: Response) {
        const getUsersUseCaseResponse = await this.getUsersUseCase.execute();

        res.send(getUsersUseCaseResponse);
    }
}

export default GetUsersController;