import mongoose from 'mongoose'
import { IToken } from '~/types/token.types'

const TokenSchema = new mongoose.Schema<IToken>(
  {
    refreshToken: { type: String, required: true },
    ip: { type: String, required: true },
    userAgent: { type: String, required: true },
    isValid: { type: Boolean, default: true },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

export default mongoose.model('Token', TokenSchema)
