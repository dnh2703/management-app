import { ICustomer } from './customer.types'
import { ITechStack } from './techStack.types'

interface IProject {
  _id: string
  title: string
  project_id: string
  start_date: string
  end_date: string
  status: 'in progress' | 'canceled' | 'done' | 'pending'
  tech_stacks: ITechStack[]
  priority: string
  customer: ICustomer
}

interface IProjectAPIBody {
  title: string
  status: 'in progress' | 'canceled' | 'done' | 'pending'
  project_type: string
  priority: string
  department_id: string
  employees_id: string[]
  tech_stacks_id: string[]
}

export type { IProject, IProjectAPIBody }
