import mongoose from 'mongoose'

interface IEmployee {
  first_name: string
  last_name: string
  employee_id: number
  full_name: string
  gender: string
  phone_number: string
  birthday: Date
  experience: 'Fresher' | 'Junior' | 'Middle' | 'Senior'
  tech_stacks: mongoose.Types.DocumentArray<{
    _id: mongoose.Types.ObjectId
  }>
  projects: mongoose.Types.DocumentArray<{
    _id: mongoose.Types.ObjectId
  }>
  department?: mongoose.Types.ObjectId
}

export { IEmployee }
