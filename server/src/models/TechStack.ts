import mongoose from 'mongoose'
import { ITechStack } from '~/types/techStack.types'

const TechStackSchema = new mongoose.Schema<ITechStack>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Please provide the name']
    },
    category: [
      {
        type: String,
        required: [true, 'Please provide category']
      }
    ]
  },
  { timestamps: true }
)

export default mongoose.model('TechStack', TechStackSchema)
