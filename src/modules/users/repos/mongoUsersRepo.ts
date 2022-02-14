import { IUser } from '../domain';
import { IUserRepo } from './usersRepo';
import userModel from '../../../models/user.models';

class MongoUserRepo implements IUserRepo {
    public async getAllUsers(): Promise<IUser[]> {
        return userModel.find();
    }
}

export { MongoUserRepo }