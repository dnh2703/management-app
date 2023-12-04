import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { MongoError } from 'mongodb'
import CustomAPIError from '~/errors/custom-api'

const notFound = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: 'Route does not exit' })
}

const errorHandleMiddleware = (err: CustomAPIError, req: Request, res: Response, next: NextFunction) => {
  const customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later'
  }

  if (err.name === 'ValidationError') {
    customError.msg = err.message
    customError.statusCode = StatusCodes.BAD_REQUEST
  }

  if (err instanceof MongoError) {
    if (err.code === 11000) {
      customError.statusCode = StatusCodes.BAD_REQUEST
      customError.msg = err.errmsg
    }
  }

  if (err.name === 'CastError') {
    customError.msg = `No item found with id`
    customError.statusCode = StatusCodes.NOT_FOUND
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}

export { notFound, errorHandleMiddleware }
