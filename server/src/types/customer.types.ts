import mongoose from 'mongoose'

interface ICustomer {
  name: string
  location: string
  country: string
  company: string
  priority: 'medium' | 'low' | 'high'
  status: 'active' | 'no active'
  projects: mongoose.Types.DocumentArray<{
    _id: mongoose.Types.ObjectId
  }>
}

export type { ICustomer }
