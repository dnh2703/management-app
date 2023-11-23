import mongoose, { Model } from 'mongoose'
import bcrypt from 'bcryptjs'
import validator from 'validator'
import { IUserMethods, IUser } from '~/types/user.types'

type UserModel = Model<IUser, any, IUserMethods>

const UserSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: [true, 'Please fill the name']
    },
    email: {
      type: String,
      required: [true, 'Please fill the email'],
      validate: {
        validator: (email: string) => validator.isEmail(email),
        message: 'Email validation failed'
      }
    },
    password: {
      type: String,
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

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  const isMatch = (await bcrypt.compare(candidatePassword, this.password)) as boolean
  return isMatch
}

export default mongoose.model<IUser, UserModel>('User', UserSchema)
