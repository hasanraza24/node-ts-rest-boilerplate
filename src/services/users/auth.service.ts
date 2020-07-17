import { User, IUserModel } from '../../models/user.model'
import { Service } from 'typedi'
import { IUser } from '../../interfaces/user'
import * as jwt from 'jsonwebtoken'
import { jwtSecret } from '../../configs';
import bcrypt from 'bcrypt'
import ApiError from '../../utils/apiError'

const userModel = new User()

interface IUserInfo {
  email?: string,
  phone?: string,
  password: string
}

@Service()
export default class AuthService {
  
  public async signUp(userData: IUser) {
    try {
      const user = await userModel.create(userData)
      const salt = bcrypt.genSaltSync(10)
      user.password = bcrypt.hashSync(user.password, salt)
      const token = await jwt.sign({
        userId: user._id
      }, jwtSecret)
      return {
        _id: user._id,
        token: token
      }
    } catch (e) {
      return Promise.reject(e)
    }
  }

  public async signInWithPassword(userInfo: IUserInfo) {
    try {
      let user: IUserModel | null
      if (userInfo.email) {
        user = await userModel.findByEmail(userInfo.email)
      } else if (userInfo.phone) {
        user = await userModel.findByPhone(userInfo.phone)
      } else {
        const err = new ApiError('email or phone is mandatory', 400)
        throw err
      }
      if (!user) {
        const error = new ApiError('username or password is not right', 403)
        throw  error
      }
      const salt = bcrypt.genSaltSync(10)
      if (!bcrypt.compareSync(userInfo.password, salt)) {
        const error = new ApiError('username or password is not right', 403)
        throw  error
      }
      return user
    } catch (e) {
      return Promise.reject(e)
    }
  }
}