import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Customer from '~/models/Customer'
import Department from '~/models/Department'
import Employee from '~/models/Employee'
import Project from '~/models/Project'

const getDashboardData = async (req: Request, res: Response) => {
  const ListEmployee = await Employee.find()
  const ListDepartment = await Department.find()
  const ListProject = await Project.find().populate('tech_stacks')
  const ListCustomer = await Customer.find()

  res.status(StatusCodes.OK).json({ ListDepartment, ListCustomer, ListEmployee, ListProject })
}

export { getDashboardData }
