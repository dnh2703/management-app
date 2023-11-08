import { NextFunction, Request, Response } from 'express'
import { request } from 'http'
import { StatusCodes } from 'http-status-codes'
import CustomAPIError from '~/errors/custom-api'

const notFound = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).send('Route does not exit')
}

const errorHandleMiddleware = (err: CustomAPIError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'INTERNAL SERVER ERROR' })
}

export { notFound, errorHandleMiddleware }
