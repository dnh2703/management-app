import mongoose from 'mongoose'
import { IEmployee } from '~/types/employee.types'

const EmployeeSchema = new mongoose.Schema<IEmployee>(
  {
    employee_id: {
      type: Number,
      required: [true, 'Please fill the first name'],
      unique: true
    },
    first_name: {
      type: String,
      required: [true, 'Please fill the first name']
    },
    last_name: {
      type: String,
      required: [true, 'Please fill the last name']
    },
    full_name: {
      type: String,
      default: function () {
        return this.last_name + ' ' + this.first_name
      }
    },
    gender: {
      type: String
    },
    experience: {
      type: String,
      enum: ['Fresher', 'Junior', 'Middle', 'Senior'],
      required: [true, 'Please provide experience']
    },
    phone_number: {
      type: String,
      required: [true, 'Please provide the phone number']
    },
    birthday: {
      type: Date,
      required: [true, 'Please provide the birth']
    },
    department: {
      type: mongoose.Types.ObjectId,
      ref: 'Department'
    },
    projects: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Project'
      }
    ],
    tech_stacks: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'TechStack'
      }
    ]
  },
  { timestamps: true }
)

export default mongoose.model('Employee', EmployeeSchema)
