import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'
import CustomAPIError from '~/errors/custom-api'
import { isTokenValid } from '~/utils/jwt'

export interface CustomRequest extends Request {
  token: string | JwtPayload
}

const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header('Authorization')

    if (!authHeader) {
      throw new CustomAPIError('Access Denied', StatusCodes.UNAUTHORIZED)
    }
    const token = authHeader.split(' ')[1]
    const payload = isTokenValid(token)

    ;(req as CustomRequest).token = payload
    next()
  } catch (error) {
    throw new CustomAPIError('Authentication Invalid', StatusCodes.UNAUTHORIZED)
  }
}

export { authenticateUser }
