import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import CustomAPIError from '~/errors/custom-api'
import User from '~/models/User'

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!email || !password) {
    throw new CustomAPIError('Please provide email and password', StatusCodes.BAD_REQUEST)
  }

  if (user) {
    throw new CustomAPIError('Email already exits', StatusCodes.CONFLICT)
  }

  await User.create({ email, password })

  res.status(StatusCodes.CREATED).send('Register successful')
}

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
}

export { login, register }
