import mongoose from 'mongoose'

interface IProject {
  title: string
  project_id: string
  project_type: string
  start_date: Date
  end_date: Date
  employees: mongoose.Types.DocumentArray<{
    _id: mongoose.Types.ObjectId
  }>
  tech_stacks: mongoose.Types.DocumentArray<{
    _id: mongoose.Types.ObjectId
  }>
  status: 'in progress' | 'canceled' | 'done' | 'pending'
  priority: 'medium' | 'high' | 'low'
  customer?: mongoose.Types.ObjectId
  department?: mongoose.Types.ObjectId
}

export { IProject }
