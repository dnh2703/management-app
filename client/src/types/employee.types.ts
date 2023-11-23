import { IProject } from './project.types'
import { IDepartment } from './department.types'
import { ITechStack } from './techStack.types'

interface IEmployee {
  _id: string
  first_name: string
  last_name: string
  full_name: string
  phone_number: string
  gender: 'male' | 'female'
  experience: string
  birthday: string
  projects: IProject[]
  tech_stacks: ITechStack[]
  department?: IDepartment
}

interface IEmployeeAPIBody {
  first_name: string
  last_name: string
  phone_number: string
  gender: 'male' | 'female'
  experience: string
  birthday: string
  tech_stacks_id: string[]
}

export type { IEmployee, IEmployeeAPIBody }
