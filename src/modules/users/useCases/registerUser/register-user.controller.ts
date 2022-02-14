import { Request, Response } from 'express';
import { IRegisterUserUseCase } from './register-user.use-case';
import { IRegisterUserDTO } from '../../dto';

class RegisterUserController {
    private registerUserUseCase: IRegisterUserUseCase;

    constructor(registerUserUseCase: IRegisterUserUseCase) {
        this.registerUserUseCase = registerUserUseCase;
    }

    public async execute(req: Request, res: Response) {
        const newUser: IRegisterUserDTO = {
            email: req.body.email as string,
            password: req.body.password as string,
        };

        const useCaseResponse = await this.registerUserUseCase.execute(newUser);

        res.send(useCaseResponse);
    }
}

export default RegisterUserController;
