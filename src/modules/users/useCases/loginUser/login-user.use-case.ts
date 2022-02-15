import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { LoginUserErrors } from './login-user.errors';
import { IUsersRepo } from '../../repos/user.repo';
import { IAccessTokenDTO, ILoginUserDTO } from '../../dto';
import config from '../../../../config';

export interface ILoginUserUseCase {
    execute(loginParams: ILoginUserDTO): Promise<IAccessTokenDTO>;
}

export class LoginUserUseCase implements ILoginUserUseCase {
    private usersRepo: IUsersRepo;

    constructor(usersRepo: IUsersRepo) {
        this.usersRepo = usersRepo;
    }

    public async execute(loginParams: ILoginUserDTO): Promise<IAccessTokenDTO> {
        const { email, password } = loginParams;
        const foundUser = await this.usersRepo.getUserByEmail(email);

        if (!foundUser) {
            throw new LoginUserErrors.UserNotFound(email);
        }

        const isCorrectPassword = await bcrypt.compare(password, foundUser.password);

        if (!isCorrectPassword) {
            throw new LoginUserErrors.UserInvalidPassword();
        }

        const token = jwt.sign({ id: foundUser._id, email: foundUser.email }, config.tokenKey, {
            expiresIn: '10h',
        });

        await this.usersRepo.saveUserToken(foundUser._id, token);

        return { token };
    }
}
