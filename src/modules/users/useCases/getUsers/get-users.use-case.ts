import { IUsersRepo } from '../../repos/user.repo';
import { IUser } from '../../domain/user.entity';

export interface IGetUsersUseCase {
    execute(): Promise<IUser[]>
}

class GetUsersUseCase implements IGetUsersUseCase {
    private usersRepo: IUsersRepo;

    constructor(usersRepo: IUsersRepo) {
        this.usersRepo = usersRepo;
    }

    public async execute(): Promise<IUser[]> {
        return this.usersRepo.getAllUsers();
    }
}

export default GetUsersUseCase;