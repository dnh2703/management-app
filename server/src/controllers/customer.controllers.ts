import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import CustomAPIError from '~/errors/custom-api'
import Customer from '~/models/Customer'
import Project from '~/models/Project'

const createCustomer = async (req: Request, res: Response) => {
  const { name, location, country, priority, status, company, projects_id } = req.body

  const projects = await Project.find({ _id: { $in: projects_id } })

  if (projects.length != projects_id.length) {
    throw new CustomAPIError('PROJECT_ID_ERROR', StatusCodes.BAD_REQUEST, 'Project id error')
  }

  const customer = await Customer.create({ name, location, company, country, priority, status, projects: projects_id })

  await Project.updateMany({ _id: { $in: projects_id } }, { $set: { customer: customer } }, { runValidators: true })

  res.status(StatusCodes.CREATED).json({ customer, msg: 'Created success' })
}

const getSingleCustomer = async (req: Request, res: Response) => {
  const { id: customerId } = req.params

  const customer = await Customer.findOne({ _id: customerId }).populate('projects')

  if (!customer) {
    throw new CustomAPIError('NOT_FOUND_CUSTOMER', StatusCodes.NOT_FOUND, `No customer with id : ${customerId}`)
  }

  res.status(StatusCodes.OK).json({ customer })
}

const getAllCustomer = async (req: Request, res: Response) => {
  let options = {}

  const { q } = req.query

  const page: number = parseInt(req.query.page as any) || 0
  const size: number = parseInt(req.query.size as any) || 5

  if (q) {
    options = {
      ...options,
      name: { $regex: new RegExp(q.toString(), 'i') }
    }
  }

  const ListCustomer = await Customer.find(options)
    .limit(size)
    .skip(size * page)

  let totalPage
  if (Object.keys(options).length) {
    totalPage = Math.ceil((await Customer.find(options)).length / size)
  } else {
    totalPage = Math.ceil((await Customer.countDocuments()) / size)
  }
  res.status(StatusCodes.OK).json({ ListCustomer, totalPage })
}

const updateCustomer = async (req: Request, res: Response) => {
  const { id: customerId } = req.params
  const { name, location, status, priority, company, projects_id, country } = req.body

  const updatedCustomer = await Customer.findOneAndUpdate(
    { _id: customerId },
    {
      name,
      location,
      company,
      status,
      country,
      priority,
      projects: projects_id
    },
    {
      runValidators: true
    }
  )

  if (!updatedCustomer) {
    throw new CustomAPIError('NOT_FOUND_CUSTOMER', StatusCodes.NOT_FOUND, `No customer with id : ${customerId}`)
  }

  if (projects_id && Array.isArray(projects_id)) {
    // Update the associated projects with the modified customer
    const updatedProjects = await Project.updateMany(
      { _id: { $in: projects_id } },
      { $set: { customer: updatedCustomer._id } },
      { runValidators: true }
    )

    const removedProjects = updatedCustomer.projects.filter((projectId) => !projects_id.includes(projectId.toString()))

    if (removedProjects.length > 0) {
      await Project.updateMany({ _id: { $in: removedProjects } }, { $unset: { customer: '' } }, { runValidators: true })
    }
  }

  res.status(StatusCodes.OK).json({ updatedCustomer })
}

const deleteCustomer = async (req: Request, res: Response) => {
  const { id: customerId } = req.params

  const customer = await Customer.findOneAndDelete({ _id: customerId })

  if (!customer) {
    throw new CustomAPIError('NOT_FOUND_CUSTOMER', StatusCodes.NOT_FOUND, `No customer with id ${customerId}`)
  }

  await Project.updateMany({ customer: customer._id }, { $unset: { customer: '' } }, { runValidators: true })

  res.status(StatusCodes.OK).send('Success! Customer removed')
}

export { getSingleCustomer, getAllCustomer, createCustomer, updateCustomer, deleteCustomer }
