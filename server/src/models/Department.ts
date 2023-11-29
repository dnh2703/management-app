import mongoose from 'mongoose'

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please fill name department'],
    unique: true
  },
  employees: [{ type: mongoose.Types.ObjectId, ref: 'Employee' }],
  projects: [{ type: mongoose.Types.ObjectId, ref: 'Project' }]
})

export default mongoose.model('Department', DepartmentSchema)
