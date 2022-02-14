import { model, Document } from 'mongoose'
import { IUser } from '../../domain';
import userSchema from '../schemas/user.schema';

export interface IUserDO extends IUser, Document {}

const userModel = model<IUser>('User', userSchema);

export default userModel;