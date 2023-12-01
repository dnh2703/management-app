import mongoose from 'mongoose'

interface ICustomer {
  name: string
  customer_id: number
  location: string
  country: string
  company: string
  priority: 'medium' | 'low' | 'high'
  status: 'active' | 'in-active'
  projects: mongoose.Types.DocumentArray<{
    _id: mongoose.Types.ObjectId
  }>
}

export type { ICustomer }
