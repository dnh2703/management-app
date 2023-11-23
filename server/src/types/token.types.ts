import mongoose from 'mongoose'

interface IToken {
  refreshToken: string
  ip: string
  userAgent: string
  isValid: boolean
  user?: mongoose.Types.ObjectId
}

export { IToken }
