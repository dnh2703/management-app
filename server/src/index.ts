import express, { Express } from 'express'
import 'express-async-errors'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/connect'
import { errorHandleMiddleware, notFound } from './middlewares/error.middlewares'
import AuthRoute from './routes/auth.routes'
import UserRoute from './routes/user.routes'
import CustomerRoute from './routes/customer.routes'
import EmployeeRoute from './routes/employee.routes'
import ProjectRoute from './routes/project.routes'
import TechStackRoute from './routes/techStack.routes'
import DepartmentRoute from './routes/department.routes'
import DashboardRoute from './routes/dashboard.routes'

dotenv.config()

const app: Express = express()
app.use(cors())
app.use(express.json())

app.use('/api/v1/auth', AuthRoute)
app.use('/api/v1/user', UserRoute)
app.use('/api/v1/employee', EmployeeRoute)
app.use('/api/v1/project', ProjectRoute)
app.use('/api/v1/customer', CustomerRoute)
app.use('/api/v1/department', DepartmentRoute)
app.use('/api/v1/techStack', TechStackRoute)
app.use('/api/v1/dashboard', DashboardRoute)

app.use(notFound)
app.use(errorHandleMiddleware)

const port = 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => console.log(`server is listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
