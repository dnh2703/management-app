import mongoose from 'mongoose'
import { ICustomer } from '~/types/customer.types'

const CustomerSchema = new mongoose.Schema<ICustomer>(
  {
    customer_id: {
      type: Number,
      unique: true,
      required: [true, 'Please fill the customer_id']
    },
    name: {
      type: String,
      required: [true, 'Please fill the name']
    },
    company: {
      type: String,
      required: [true, 'Please fill the company']
    },
    country: {
      type: String,
      required: [true, 'Please fill the country']
    },
    location: {
      type: String,
      required: [true, 'Please fill the location']
    },
    priority: {
      type: String,
      enum: ['medium', 'low', 'high'],
      default: 'medium'
    },

    status: {
      type: String,
      enum: ['active', 'in-active'],
      default: 'active'
    },
    projects: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Project'
      }
    ]
  },
  { timestamps: true }
)

export default mongoose.model('Customer', CustomerSchema)
