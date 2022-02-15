import { Request, Response } from 'express';
import { IRegisterUserUseCase } from './register-user.use-case';
import { IRegisterUserDTO } from '../../dto';
import { RegisterUserErrors } from './register-user.errors';

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

        try {
            const useCaseResponse = await this.registerUserUseCase.execute(newUser);
            res.send(useCaseResponse);
        } catch (error: any) {
            switch (error.constructor) {
                case RegisterUserErrors.UserAlreadyRegistered:
                    res.status(409).send({ message: error.message });
                    break;
                default:
                    res.sendStatus(500);
            }
        }
    }
}

export default RegisterUserController;
