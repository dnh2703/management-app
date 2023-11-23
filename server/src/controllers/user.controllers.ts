import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import User from '~/models/User'

const getAllUser = async (req: Request, res: Response) => {
  const ListUser = await User.find()

  res.status(StatusCodes.OK).json({ ListUser })
}

export { getAllUser }
