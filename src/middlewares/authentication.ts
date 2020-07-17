import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";
import * as jwt from 'jsonwebtoken'
import { jwtSecret } from "../configs";

export function authenticate (isAuthenticated: boolean) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!isAuthenticated) {
      return next()
    }
    const token = getToken(req)
    if (!token) {
      const err = new ApiError('Auth token is missing', 405)
      next(err)
    }
    const payload = jwt.verify(token, jwtSecret)
    res.locals.user = payload
    next()
  }
}

function getToken(req: Request) {
  let token: string;
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
     token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token.toString()
  }
  return token;
}