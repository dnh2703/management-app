import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import TechStack from '~/models/TechStack'

const createTechStack = async (req: Request, res: Response) => {
  const { name, category } = req.body

  await TechStack.create({ name, category })

  res.status(StatusCodes.CREATED).json('Created successfully')
}

const getAllTechStack = async (req: Request, res: Response) => {
  const ListTechStack = await TechStack.find()

  res.status(StatusCodes.OK).json({ ListTechStack })
}

export { getAllTechStack, createTechStack }
