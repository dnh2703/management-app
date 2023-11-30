import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import CustomAPIError from '~/errors/custom-api'
import { isTokenValid } from '~/utils/jwt'

const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header('Authorization')

    if (!authHeader) {
      throw new CustomAPIError('INVALID_CREDENTIALS', StatusCodes.UNAUTHORIZED, 'Access Denied')
    }
    const token = authHeader.split(' ')[1]
    const payload = isTokenValid(token)

    req.user = { ...req.user, user_id: payload.user_id, email: payload.email, role: payload.role }
    next()
  } catch (error) {
    throw new CustomAPIError('AUTHENTICATION_INVALID', StatusCodes.UNAUTHORIZED, 'Authentication Invalid')
  }
}

const authorizePermissions = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomAPIError('Unauthorized_Error', StatusCodes.FORBIDDEN, `You don't have permission!`)
    }
    next()
  }
}

export { authenticateUser, authorizePermissions }
