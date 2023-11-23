export interface ProjectSchema {
  title: string
  project_id: string
  status: 'in progress' | 'canceled' | 'done' | 'pending'
  priority: string
  project_type: string
  start_date?: string
  end_date?: string
  department: {
    value: string
    label: string
  }
  tech_stacks: {
    value: string
    label: string
  }[]
  employees: {
    value: string
    label: string
  }[]
}
