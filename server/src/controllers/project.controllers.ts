import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import CustomAPIError from '~/errors/custom-api'
import Customer from '~/models/Customer'
import Department from '~/models/Department'
import Employee from '~/models/Employee'
import Project from '~/models/Project'

const createProject = async (req: Request, res: Response) => {
  const { title, status, project_type, department_id, start_date, end_date, priority, employees_id, tech_stacks_id } =
    req.body

  const latestProject = await Project.find().sort({ _id: -1 }).limit(1)
  const project_id = `${parseInt(latestProject[0].project_id) + 1}`

  const project = await Project.create({
    project_id,
    title,
    status,
    priority,
    project_type,
    start_date,
    end_date,
    employees: employees_id,
    tech_stacks: tech_stacks_id,
    department: department_id
  })

  await Employee.updateMany({ _id: { $in: employees_id } }, { $push: { projects: project } }, { runValidators: true })
  await Department.updateOne({ _id: { $in: department_id } }, { $push: { projects: project } }, { runValidators: true })

  res.status(StatusCodes.CREATED).json({ project })
}

const updateProject = async (req: Request, res: Response) => {
  const {
    title,
    status,
    department_id,
    project_type,
    start_date,
    end_date,
    priority,
    employees_id,
    tech_stacks_id,
    customer_id
  } = req.body

  const { id: projectId } = req.params

  // findByIdAndUpdate will get data before update, if you set new equal false. Nếu không set thì mặc định giá trị của new cũng là false
  const updatedProject = await Project.findByIdAndUpdate(
    { _id: projectId },
    {
      title,
      status,
      priority,
      start_date,
      end_date,
      customer_id,
      employees: employees_id,
      tech_stacks: tech_stacks_id,
      department: department_id,
      project_type
    },
    { runValidators: true, new: false }
  )

  if (!updatedProject) {
    throw new CustomAPIError('NOT_FOUND_PROJECT', StatusCodes.NOT_FOUND, `No project with id : ${projectId}`)
  }

  if (employees_id && Array.isArray(employees_id) && department_id) {
    const oldEmployees = await Employee.find({
      $and: [{ _id: { $in: employees_id }, projects: { $in: updatedProject } }]
    })

    const oldDepartment = await Department.findOne({
      $and: [{ _id: department_id, projects: { $in: updatedProject } }]
    })

    await Employee.updateMany(
      {
        $and: [{ _id: { $in: employees_id } }, { _id: { $nin: oldEmployees } }]
      },
      { $push: { projects: updatedProject } },
      { runValidators: true }
    )

    if (!oldDepartment) {
      await Department.updateOne(
        { _id: { $in: department_id } },
        { $push: { projects: updatedProject } },
        { runValidators: true }
      )
    }
    const removedDepartment = updatedProject.department?.toString() != department_id ? department_id : ''

    const removedEmployees = updatedProject.employees
      .filter((employeeId) => !employees_id.includes(employeeId.toString()))
      .map((item) => item._id)

    await Department.updateOne(
      { _id: removedDepartment._id },
      { $pull: { projects: updatedProject._id } },
      { runValidators: true }
    )

    await Employee.updateMany(
      { _id: { $in: removedEmployees } },
      { $pull: { projects: updatedProject._id } },
      { runValidators: true }
    )
  }

  res.status(StatusCodes.OK).json({ updatedProject })
}

const getAllProject = async (req: Request, res: Response) => {
  let options = {}

  const { q, status } = req.query

  const page: number = parseInt(req.query.page as any) || 0
  const size: number = parseInt(req.query.size as any) || 5

  if (q) {
    options = {
      ...options,
      $or: [{ title: new RegExp(q.toString(), 'i') }, { project_id: new RegExp(q.toString(), 'i') }]
    }
  }

  if (typeof status == 'string' && status) {
    options = {
      ...options,
      status: { $in: status.split(',') }
    }
  }

  const ListProject = await Project.find(options)
    .populate('tech_stacks')
    .limit(size)
    .skip(size * page)

  let totalPage
  if (Object.keys(options).length) {
    totalPage = Math.ceil((await Project.find(options)).length / size)
  } else {
    totalPage = Math.ceil((await Project.countDocuments()) / size)
  }
  res.status(StatusCodes.OK).json({ ListProject, totalPage })
}

const getSingleProject = async (req: Request, res: Response) => {
  const { id: projectId } = req.params

  const project = await Project.findOne({ _id: projectId })
    .populate('tech_stacks')
    .populate('department')
    .populate('customer')
    .populate('employees')

  if (!project) {
    throw new CustomAPIError('NOT_FOUND_PROJECT', StatusCodes.NOT_FOUND, `No project with id : ${projectId}`)
  }

  res.status(StatusCodes.OK).json({ project })
}

const getAllProjectWithoutCustomer = async (req: Request, res: Response) => {
  const ListProjectWithoutCustomer = (await Project.find()).filter((item) => !item.customer)

  res.status(StatusCodes.OK).json({ ListProjectWithoutCustomer })
}

const getAllProjectWithoutDepartment = async (req: Request, res: Response) => {
  const ListProjectWithoutDepartment = (await Project.find()).filter((item) => !item.department)

  res.status(StatusCodes.OK).json({ ListProjectWithoutDepartment })
}

const deleteProject = async (req: Request, res: Response) => {
  const { id: projectId } = req.params

  const project = await Project.findOneAndDelete({ _id: projectId })

  if (!project) {
    throw new CustomAPIError('NOT_FOUND_PROJECT', StatusCodes.NOT_FOUND, `No project with id : ${projectId}`)
  }

  await Department.updateOne(
    { projects: { $in: project._id } },
    { $pull: { projects: project._id } },
    { runValidators: true, new: true }
  )
  await Employee.updateMany(
    { projects: { $in: project._id } },
    { $pull: { projects: project._id } },
    { runValidators: true, new: true }
  )

  await Customer.updateOne(
    { projects: { $in: project._id } },
    { $pull: { projects: project._id } },
    { runValidators: true, new: true }
  )

  res.status(StatusCodes.OK).send('Success! Project removed.')
}

export {
  getSingleProject,
  getAllProject,
  createProject,
  updateProject,
  getAllProjectWithoutCustomer,
  deleteProject,
  getAllProjectWithoutDepartment
}
