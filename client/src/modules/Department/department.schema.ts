export interface DepartmentSchema {
  name: string
  projects: {
    label: string
    value: string
  }[]
  employees: {
    label: string
    value: string
  }[]
}
