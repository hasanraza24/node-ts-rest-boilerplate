import { Request, Response, NextFunction } from 'express'
import { plainToClass } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import ApiError from '../utils/apiError'

export function validateRequest (validSchema: any) {
  return function (req: Request, res: Response, next: NextFunction) {
    validate(plainToClass(validSchema, req.body))
      .then((errs: ValidationError[]) => {
        if (errs.length > 0) {
          errs[0].constraints
          const errMessage = errs.map((err: ValidationError) => Object.values(err.constraints))
            .join(',')
          next(new ApiError(errMessage, 400))
        } else {
          next()
        }
      })
  }
}