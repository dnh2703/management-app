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
}
