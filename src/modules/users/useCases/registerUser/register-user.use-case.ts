import bcrypt from 'bcrypt';
import { IUser } from '../../domain';
import { IRegisterUserDTO } from '../../dto';
import { IUsersRepo } from '../../repos/user.repo';
import { RegisterUserErrors } from './register-user.errors';

export interface IRegisterUserUseCase {
    execute(registerParams: IRegisterUserDTO): Promise<IUser>;
}

class RegisterUserUseCase implements IRegisterUserUseCase {
    private usersRepo: IUsersRepo;

    constructor(usersRepo: IUsersRepo) {
        this.usersRepo = usersRepo;
    }

    public async execute(registerParams: IRegisterUserDTO): Promise<IUser> {
        const { email, password } = registerParams;

        const foundUser = await this.usersRepo.getUserByEmail(email);

        if (foundUser) {
            throw new RegisterUserErrors.UserAlreadyRegistered(email);
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser: IRegisterUserDTO = {
            email,
            password: encryptedPassword,
        };

        return this.usersRepo.createUser(newUser);
    }
}

export default RegisterUserUseCase;
