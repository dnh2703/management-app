import mongoose from 'mongoose'
import validator from 'validator'

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please fill the email'],
      validate: {
        validator: validator.isEmail
      }
    },
    password: {
      type: String,
      required: [true, 'Please fill the password'],
      minlength: 6
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    }
  },
  { timestamps: true }
)

export default mongoose.model('User', UserSchema)
