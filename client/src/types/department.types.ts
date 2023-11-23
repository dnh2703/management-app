import { IEmployee } from './employee.types'
import { IProject } from './project.types'

interface IDepartment {
  _id: string
  name: string
  projects?: IProject[]
  employees?: IEmployee[]
}

interface IDepartmentAPIBody {
  name: string
  projects_id: string[]
  employees_id: string[]
}

export type { IDepartment, IDepartmentAPIBody }
