import { IUser } from '../domain';
import { IRegisterUserDTO } from '../dto';

interface IUsersRepo {
    getAllUsers(): Promise<IUser[]>;
    getUserByEmail(email: string): Promise<IUser | null>;
    createUser(newUser: IRegisterUserDTO): Promise<IUser>;
}

export { IUsersRepo };
