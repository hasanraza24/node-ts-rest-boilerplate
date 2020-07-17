import { IUser } from '../interfaces/user';
import { Schema } from 'mongoose';
import { Entity, IEntityModel } from './entity.model';

export interface IUserModel extends IUser, IEntityModel {
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  state: {
    type: String
  }
}, { timestamps: true })

export class User extends Entity<IUserModel> {
  constructor() {
    super(userSchema, 'User')
  }

  public async findByEmail (email: string): Promise<IUserModel | null> {
    try {
      return await this._model.findOne({ email: email })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  public async findByPhone (phone: string): Promise<IUserModel | null> {
    try {
      return await this._model.findOne({ phone: phone })
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
