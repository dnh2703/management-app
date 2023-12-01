import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import CustomAPIError from '~/errors/custom-api'
import Department from '~/models/Department'
import Employee from '~/models/Employee'
import Project from '~/models/Project'

const createDepartment = async (req: Request, res: Response) => {
  const { name, employees_id, projects_id } = req.body

  const department = await Department.findOne({ name: name })

  if (department) {
    throw new CustomAPIError('DEPARTMENT_ALREADY_EX', StatusCodes.BAD_REQUEST, `Department already exits`)
  }

  await Department.create({
    name,
    employees: employees_id,
    projects: projects_id
  })

  res.status(StatusCodes.CREATED).json({ department })
}

const updateDepartment = async (req: Request, res: Response) => {
  const { name, employees_id } = req.body

  const { id: departmentName } = req.params

  const departmentUpdated = await Department.findByIdAndUpdate(
    { name: departmentName },
    { name, employees: employees_id },
    {
      runValidators: true
    }
  )

  if (!departmentUpdated) {
    throw new CustomAPIError(
      'NOT_FOUND_DEPARTMENT',
      StatusCodes.NOT_FOUND,
      `No department with name : ${departmentName}`
    )
  }

  if (employees_id && Array.isArray(employees_id)) {
    // Update the associated projects with the modified customer

    const updatedEmployees = await Employee.updateMany(
      { _id: { $in: employees_id } },
      { $set: { department: departmentUpdated._id } },
      { runValidators: true }
    )

    const removedEmployees = departmentUpdated.employees.filter(
      (employeeId) => !employees_id.includes(employeeId.toString())
    )

    if (removedEmployees.length > 0) {
      await Employee.updateMany(
        { _id: { $in: removedEmployees } },
        { $unset: { department: '' } },
        { runValidators: true }
      )
    }
  }

  res.status(StatusCodes.OK).json({ departmentUpdated })
}

const getAllDepartment = async (req: Request, res: Response) => {
  let options = {}
  const { q } = req.query

  const page: number = parseInt(req.query.page as any) || 1
  const size: number = parseInt(req.query.size as any) || 5

  if (q) {
    options = {
      ...options,
      name: new RegExp(q.toString(), 'i')
    }
  }
  const ListDepartment = await Department.find(options)
    .populate('employees')
    .limit(size)
    .skip(size * (page - 1))

  let totalPage
  if (Object.keys(options).length) {
    totalPage = Math.ceil((await Department.find(options)).length / size)
  } else {
    totalPage = Math.ceil((await Department.countDocuments()) / size)
  }

  res.status(StatusCodes.OK).json({ ListDepartment, totalPage })
}

const getSingleDepartment = async (req: Request, res: Response) => {
  const { id: departmentName } = req.params

  const department = await Department.findOne({ name: departmentName }).populate('employees').populate('projects')

  res.status(StatusCodes.OK).json({ department })
}

const getAllEmployeeInDepartment = async (req: Request, res: Response) => {
  const { id: departmentName } = req.params

  const employees = await Employee.findOne({ name: departmentName }).populate('projects')

  res.status(StatusCodes.OK).json({ employees })
}

const deleteDepartment = async (req: Request, res: Response) => {
  const { id: departmentName } = req.params

  const department = await Department.findOneAndDelete({ name: departmentName }, { new: false })

  if (!department) {
    throw new CustomAPIError(
      'NOT_FOUND_DEPARTMENT',
      StatusCodes.NOT_FOUND,
      `No department with name : ${departmentName}`
    )
  }

  await Employee.updateMany({ department: department._id }, { $unset: { department: '' } })
  await Project.updateMany({ department: department._id }, { $unset: { department: '' } })

  res.status(StatusCodes.OK).send('Success! Department removed')
}

export {
  getAllDepartment,
  createDepartment,
  updateDepartment,
  getSingleDepartment,
  getAllEmployeeInDepartment,
  deleteDepartment
}
