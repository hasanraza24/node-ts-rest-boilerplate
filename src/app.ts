import express from 'express'
import ApiError from './utils/apiError'
import { ApiResponse }  from './utils/apiResponse'
import { Request, Response, NextFunction } from 'express'
import router from './routes'
import './dbconnection'

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', (req, res, next) => {console.log('req.path', req.path); next()},router);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err  = new ApiError('Resourse not found!', 404)
  next(err)
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  console.log('err', err)
  let errMessage = err.message
  let errStatus = err.status || 500
  if (errStatus === 500) errMessage = 'Something went wrong'
  const apiResponse = new ApiResponse(true, errMessage, errStatus, null)
  console.log('apiresponse', apiResponse.response)
  res.status(errStatus).json(apiResponse.response)
});

export default app
