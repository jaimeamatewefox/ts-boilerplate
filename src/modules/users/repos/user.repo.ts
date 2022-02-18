import { IUserDO } from "../dao/do/user.do";
import { IRegisterUserDTO } from '../dto';

interface IUsersRepo {
    getAllUsers(): Promise<IUserDO[]>;
    getUserByEmail(email: string): Promise<IUserDO | null>;
    createUser(newUser: IRegisterUserDTO): Promise<IUserDO>;
    saveUserToken(id: string, token: string): Promise<IUserDO | null>;
}

export { IUsersRepo };
