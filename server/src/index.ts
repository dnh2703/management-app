import express, { Express } from 'express'
import 'express-async-errors'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/connect'
import { errorHandleMiddleware, notFound } from './middlewares/error.middlewares'
import AuthRoute from './routes/auth.routes'
import UserRoute from './routes/user.routes'

dotenv.config()

const app: Express = express()
app.use(cors())
app.use(express.json())

app.use('/api/v1/auth', AuthRoute)
app.use('/api/v1/user', UserRoute)

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
