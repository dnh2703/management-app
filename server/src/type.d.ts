import { User } from './types/user.types'
import { PayloadType } from './utils/jwt'

export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URL: string
      PORT?: string
      NODE_ENV: 'development' | 'production'
      JWT_SECRET: string
    }
  }
  namespace Express {
    export interface Request {
      language?: Language
      user: PayloadType
    }
  }
}
