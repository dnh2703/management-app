import jwt from 'jsonwebtoken'

const createJWT = (payload: string, expiresIn: string) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn })
  return token
}

const isTokenValid = (token: string) => jwt.verify(token, process.env.JWT_SECRET)

export { isTokenValid, createJWT }
