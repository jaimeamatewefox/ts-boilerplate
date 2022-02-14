import { IUser } from '../domain';

interface IUsersRepo {
    getAllUsers(): Promise<IUser[]>
}

export { IUsersRepo }