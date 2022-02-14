import { IUsersRepo } from './user.repo';
import userModel, { IUserDO } from '../dao/do/user.do';
import { IUser } from '../domain';
import { IRegisterUserDTO } from '../dto';

class MongoUserRepo implements IUsersRepo {
    public async getAllUsers(): Promise<IUserDO[]> {
        return userModel.find();
    }

    public async getUserByEmail(email: string): Promise<IUserDO | null> {
        return userModel.findOne({ email });
    }

    public async createUser(newUser: IRegisterUserDTO): Promise<IUser> {
        return userModel.create(newUser);
    }
}

export { MongoUserRepo };
