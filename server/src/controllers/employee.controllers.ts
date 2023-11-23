import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Employee from '~/models/Employee'
import Project from '~/models/Project'
import Department from '~/models/Department'
import CustomAPIError from '~/errors/custom-api'

const createEmployee = async (req: Request, res: Response) => {
  const { first_name, last_name, phone_number, gender, experience, phone, birthday, department_id, tech_stacks_id } =
    req.body
  console.log(birthday)
  const employee = await Employee.create({
    first_name,
    last_name,
    phone,
    gender,
    phone_number,
    birthday,
    experience,
    department: department_id,
    tech_stacks: tech_stacks_id
  })

  res.status(StatusCodes.CREATED).json({ employee })
}

const getAllEmployee = async (req: Request, res: Response) => {
  let options = {}

  const { q } = req.query

  const page: number = parseInt(req.query.page as any) || 0
  const size: number = parseInt(req.query.size as any) || 5

  if (q) {
    options = {
      ...options,
      full_name: { $regex: new RegExp(q.toString(), 'i') }
    }
  }
  const ListEmployee = await Employee.find(options)
    .populate('department')
    .populate('tech_stacks')
    .populate({ path: 'projects', select: 'status' })
    .limit(size)
    .skip(size * page)

  let totalPage
  if (Object.keys(options).length) {
    totalPage = Math.ceil((await Employee.find(options)).length / size)
  } else {
    totalPage = Math.ceil((await Employee.countDocuments()) / size)
  }

  res.status(StatusCodes.OK).json({ ListEmployee, totalPage })
}

const getSingleEmployee = async (req: Request, res: Response) => {
  const { id: employeeId } = req.params

  const employee = await Employee.findOne({ _id: employeeId }).populate('tech_stacks')

  if (!employee) {
    throw new CustomAPIError('NOT_FOUND_EMPLOYEE', StatusCodes.NOT_FOUND, `No employee with id : ${employeeId}`)
  }

  res.status(StatusCodes.OK).json({ employee })
}

const getAllEmployeeWithoutDepartment = async (req: Request, res: Response) => {
  const ListEmployeeWithoutDepartment = (await Employee.find()).filter((item) => !item.department)

  res.status(StatusCodes.OK).json({ ListEmployeeWithoutDepartment })
}

const updateEmployee = async (req: Request, res: Response) => {
  const { id: employeeId } = req.params

  const { first_name, last_name, birthday, gender, experience, tech_stacks_id, phone_number } = req.body

  const employee = await Employee.findByIdAndUpdate(
    { _id: employeeId },
    { first_name, last_name, birthday, gender, experience, phone_number, tech_stacks: tech_stacks_id },
    { runValidators: true }
  )

  if (!employee) {
    throw new CustomAPIError('NOT_FOUND_EMPLOYEE', StatusCodes.NOT_FOUND, `No employee with id : ${employeeId}`)
  }

  res.status(StatusCodes.OK).send('Success! Employee updated')
}

const deleteEmployee = async (req: Request, res: Response) => {
  const { id: employeeId } = req.params

  const employee = await Employee.findByIdAndDelete({ _id: employeeId })

  if (!employee) {
    throw new CustomAPIError('NOT_FOUND_EMPLOYEE', StatusCodes.NOT_FOUND, `No employee with id : ${employeeId}`)
  }

  await Project.updateMany(
    { employees: { $in: employee._id } },
    { $pull: { employees: employee._id } },
    { runValidators: true }
  )
  await Department.updateMany(
    { employees: { $in: employee._id } },
    { $pull: { employees: employee._id } },
    { runValidators: true }
  )

  res.status(StatusCodes.OK).send('Success! Employee removed.')
}

export {
  getAllEmployee,
  getSingleEmployee,
  getAllEmployeeWithoutDepartment,
  createEmployee,
  updateEmployee,
  deleteEmployee
}
