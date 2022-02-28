import { Request, Response } from 'express';
import { ILoginUserDTO } from '../../dto/login-user.dto';
import { ILoginUserUseCase } from './login-user.use-case';
import { LoginUserErrors } from './login-user.errors';

export class LoginUserController {
    private loginUserUseCase: ILoginUserUseCase;
    constructor(loginUserUseCase: ILoginUserUseCase) {
        this.loginUserUseCase = loginUserUseCase;
    }

    public async execute(req: Request, res: Response) {
        const userLoginParams: ILoginUserDTO = {
            email: req.body.email,
            password: req.body.password,
        };
        try {
            const useCaseResponse = await this.loginUserUseCase.execute(userLoginParams);
            res.send(useCaseResponse);
        } catch (error: any) {
            switch (error.constructor) {
                case LoginUserErrors.UserNotFound:
                    res.status(404).send({ message: error.message });
                    break;
                case LoginUserErrors.UserInvalidPassword:
                    res.status(403).send({ message: error.message });
                    break;
                default:
                    res.sendStatus(500);
            }
        }
    }
}
