import { User } from '../../models/user.model'
import { Service } from 'typedi'

const userModel = new User()

interface userQuery {
  name?: string,
  email?: string,
  phone?: string
}
@Service()
export default class ProfileService {
  
  public async findAll(query: userQuery) {
    try { 
      return userModel.findAll(query)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}