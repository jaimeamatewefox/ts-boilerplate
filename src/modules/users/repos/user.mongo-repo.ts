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

    public async createUser(newUser: IRegisterUserDTO): Promise<IUserDO> {
        return userModel.create(newUser);
    }

    public async saveUserToken(id: string, token: string): Promise<IUserDO | null> {
        return userModel.findByIdAndUpdate(id, { token });
    }
}

export { MongoUserRepo };
