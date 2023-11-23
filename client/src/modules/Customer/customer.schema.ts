export interface CustomerSchema {
  name: string
  location: string
  country: string
  company: string
  status: 'active' | 'no active'
  priority: number
  projects: {
    value: string
    label: string
  }[]
}
