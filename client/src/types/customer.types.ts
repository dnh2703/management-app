import { IProject } from './project.types'

interface ICustomer {
  _id: string
  name: string
  company: string
  location: string
  country: string
  status: 'active' | 'no active'
  priority: number
  projects: IProject[]
}

interface ICustomerAPIBody {
  name: string
  company: string
  country: string
  location: string
  status: 'active' | 'no active'
  priority: number
  projects_id?: string[]
}

export type { ICustomer, ICustomerAPIBody }
