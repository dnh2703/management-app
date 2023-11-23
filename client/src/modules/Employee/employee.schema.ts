export interface EmployeeSchema {
  first_name: string
  last_name: string
  gender: 'male' | 'female'
  birthday: string
  experience: 'Fresher' | 'Junior' | 'Middle' | 'Senior'
  phone_number: string
  tech_stacks: {
    label: string
    value: string
  }[]
}
