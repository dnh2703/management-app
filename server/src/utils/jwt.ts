import jwt from 'jsonwebtoken'

type PayloadType = {
  role: string
  email: string
  user_id: string
  name: string
}

const createPayload = ({ email, role, user_id, name }: PayloadType) => {
  return {
    role,
    email,
    name,
    user_id
  }
}

const createJWT = (payload: PayloadType, expiresIn: string) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn })
  return token
}

const isTokenValid = (token: string) => jwt.verify(token, process.env.JWT_SECRET) as PayloadType

const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwt.decode(token) as {
      exp: number
    }
    const expirationDateTimeInSeconds = exp * 1000
    return Date.now() >= expirationDateTimeInSeconds
  } catch {
    return true
  }
}
export { isTokenValid, createJWT, createPayload, PayloadType, isTokenExpired }
