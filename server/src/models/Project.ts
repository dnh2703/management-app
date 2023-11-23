import mongoose from 'mongoose'
import { IProject } from '~/types/project.types'

const ProjectSchema = new mongoose.Schema<IProject>({
  project_id: {
    type: String,
    unique: true
  },
  title: { type: String, required: [true, 'Please provide name project'] },
  status: {
    type: String,
    enum: ['in progress', 'canceled', 'done', 'pending'],
    default: 'pending'
  },
  project_type: {
    type: String,
    required: [true, 'Please fill project type']
  },
  priority: {
    type: String,
    enum: ['medium', 'low', 'high'],
    default: 'medium'
  },
  employees: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Employee'
    }
  ],
  tech_stacks: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'TechStack'
    }
  ],
  customer: {
    type: mongoose.Types.ObjectId,
    ref: 'Customer'
  },
  start_date: {
    type: Date
  },
  end_date: {
    type: Date
  },
  department: {
    type: mongoose.Types.ObjectId,
    ref: 'Department'
  }
})

export default mongoose.model('Project', ProjectSchema)
