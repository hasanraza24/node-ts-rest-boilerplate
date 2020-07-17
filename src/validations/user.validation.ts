import { IUser } from '../interfaces/user'
import { Length, IsEmail } from 'class-validator'

export class ValidUser implements IUser {
  @Length(2, 10)
  name: string;

  @IsEmail()
  email: string;

  @Length(10, 10)
  phone: string;

  @Length(8, 12)
  password: string;

  state?: string

}