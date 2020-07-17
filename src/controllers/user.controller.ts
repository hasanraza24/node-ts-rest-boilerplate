import { Controller, Get, Post } from '../core'
import { Service, Container, Inject } from 'typedi'
import { Request, Response, NextFunction } from 'express'
import { ApiResponse } from '../utils/apiResponse'
import { ValidUser } from '../validations/user.validation'
import AuthService from '../services/users/auth.service'
import ProfileService from '../services/users/profile.service'


@Service()
@Controller('/user')
export default class UserController {

  @Inject()
  private authService: AuthService

  @Inject()
  private profileService: ProfileService


  @Post('/signup', ValidUser, { 
    authorizedRole: 'all',
    isAuthenticated: false
   })
  public async signUp (req: Request, res: Response, next: NextFunction) {
    try {
      // const userData = this.authService.signUp(req.body)
      const userData = await this.profileService.findAll({})
      const apiResponse = new ApiResponse(false, 'successfully created!', 200, userData);
      res.json(apiResponse.response)
    } catch(e) {
      next(e)
    }
  }

  @Get('/', {
    isAuthenticated: true,
    authorizedRole: 'all'
  })
  public async getList (req: Request, res: Response, next: NextFunction) {
    try {
      const userList = await this.profileService.findAll(req.query)
      const apiResponse = new ApiResponse(false, 'user list!', 200, userList)
      res.json(apiResponse.response)
    } catch (e) {
      next(e)
    }
  }

  public async test() {
    try {
      const dd = await this.profileService.findAll({})
      console.log('dd', dd)
    } catch(e) {
      return Promise.reject(e)
    }
  }
}