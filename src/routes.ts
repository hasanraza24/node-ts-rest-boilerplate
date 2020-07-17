import express from 'express'
import UserController from './controllers/user.controller'
import { Container } from 'typedi'
import { IRoute } from './core'
import { validateRequest }  from './middlewares/validation'
import { authenticate } from './middlewares/authentication'

var router = express.Router();

// [UserController].forEach(userCon => {
//   const cont = Container.get(userCon)
//   cont.test()
// })

// //Loop thruogh all the controllers

[
  UserController
].forEach(controller => {

  // create instance of the controller
  const instance = Container.get(controller)
  //Get Prefix route of the controller
  const prefix = Reflect.getMetadata('prefix', controller)
  //Get all the internal route of the controller
  const routes: Array<IRoute> = Reflect.getMetadata('routes', controller)
  // creating all routes with express routes
  routes.forEach(route => {
    if (route.validSchema) {
      router[route.requestMethod](prefix + route.path,
        authenticate(route.isAuthenticated), // Authentication 
        validateRequest(route.validSchema), // Validate request before serving it
        instance[route.methodName].bind(instance)
      )
    }else {
      router[route.requestMethod](prefix + route.path,
        authenticate(route.isAuthenticated),
        instance[route.methodName].bind(instance)
      )
    }
  })
})

export default router