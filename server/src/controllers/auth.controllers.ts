import axios from 'axios'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import CustomAPIError from '~/errors/custom-api'
import Token from '~/models/Token'
import User from '~/models/User'
import { createJWT, createPayload, isTokenExpired, isTokenValid } from '~/utils/jwt'

const register = async (req: Request, res: Response) => {
  const { name, email, password, googleAccessToken } = req.body

  if (googleAccessToken) {
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`
      }
    })

    if (response.status == 401) {
      throw new CustomAPIError('INVALID_GOOGLE_TOKEN', StatusCodes.BAD_REQUEST, 'Invalid access token!')
    }

    const name = response.data.name
    const email = response.data.email

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw new CustomAPIError('EMAIL_ALREADY_EXITS', StatusCodes.BAD_REQUEST, 'Email already exits')
    }

    await User.create({ email, name })

    return res.status(StatusCodes.CREATED).send('Register successful')
  }

  const user = await User.findOne({ email })

  if (!email || !password) {
    throw new CustomAPIError('MISSING_CREDENTIALS', StatusCodes.BAD_REQUEST, 'Please provide email and password')
  }

  if (user) {
    throw new CustomAPIError('EMAIL_ALREADY_EXITS', StatusCodes.BAD_REQUEST, 'Email already exits')
  }

  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'

  await User.create({ email, password, role, name })

  res.status(StatusCodes.CREATED).send('Register successful')
}

const login = async (req: Request, res: Response) => {
  const { email, password, googleAccessToken } = req.body

  if (googleAccessToken) {
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`
      }
    })

    if (response.status == 401) {
      throw new CustomAPIError('INVALID_GOOGLE_TOKEN', StatusCodes.BAD_REQUEST, 'Invalid access token!')
    }

    const email = response.data.email

    const user = await User.findOne({ email })

    if (!user) {
      throw new CustomAPIError('EMAIL_INVALID', StatusCodes.BAD_REQUEST, `Email don't already exits`)
    }

    const payloadJWT = createPayload({
      role: user.role,
      email: user.email,
      user_id: user._id.toString(),
      name: user.name
    })

    // create refresh token
    let refreshToken = ''
    // check for existing token
    const existingRefreshToken = await Token.findOne({ user: user._id })

    if (existingRefreshToken) {
      const { isValid } = existingRefreshToken
      if (!isValid) {
        throw new CustomAPIError('INVALID_CREDENTIALS', StatusCodes.UNAUTHORIZED, 'Invalid Credentials')
      }
      refreshToken = existingRefreshToken.refreshToken
      if (isTokenExpired(refreshToken)) {
        const userAgent = req.headers['user-agent']
        const ip = req.ip
        refreshToken = createJWT(payloadJWT, '7d')

        await Token.deleteOne({ _id: existingRefreshToken._id })
        const userToken = { refreshToken, ip, userAgent, user: user._id }
        await Token.create(userToken)
      }

      const accessToken = createJWT(payloadJWT, '12h')
      res.status(StatusCodes.OK).json({ user: payloadJWT, refreshToken, accessToken })
      return
    }

    const userAgent = req.headers['user-agent']
    const ip = req.ip
    const accessToken = createJWT(payloadJWT, '12h')
    refreshToken = createJWT(payloadJWT, '7d')

    const userToken = { refreshToken, ip, userAgent, user: user._id }

    await Token.create(userToken)
    return res.status(StatusCodes.OK).json({ user: payloadJWT, refreshToken, accessToken })
  }

  if (!email || !password) {
    throw new CustomAPIError('MISSING_CREDENTIALS', StatusCodes.BAD_REQUEST, 'Please provide email and password')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new CustomAPIError('EMAIL_INVALID', StatusCodes.BAD_REQUEST, 'Email is not correct')
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new CustomAPIError('PASSWORD_INVALID', StatusCodes.BAD_REQUEST, 'Password is not correct')
  }

  const payloadJWT = createPayload({
    role: user.role,
    email: user.email,
    user_id: user._id.toString(),
    name: user.name
  })

  // create refresh token
  let refreshToken = ''
  // check for existing token
  const existingRefreshToken = await Token.findOne({ user: user._id })

  if (existingRefreshToken) {
    const { isValid } = existingRefreshToken
    if (!isValid) {
      throw new CustomAPIError('INVALID_CREDENTIALS', StatusCodes.UNAUTHORIZED, 'Invalid Credentials')
    }
    refreshToken = existingRefreshToken.refreshToken
    if (isTokenExpired(refreshToken)) {
      const userAgent = req.headers['user-agent']
      const ip = req.ip
      refreshToken = createJWT(payloadJWT, '7d')

      await Token.deleteOne({ _id: existingRefreshToken._id })
      const userToken = { refreshToken, ip, userAgent, user: user._id }
      await Token.create(userToken)
    }

    const accessToken = createJWT(payloadJWT, '12h')
    res.status(StatusCodes.OK).json({ user: payloadJWT, refreshToken, accessToken })
    return
  }

  const userAgent = req.headers['user-agent']
  const ip = req.ip
  const accessToken = createJWT(payloadJWT, '12h')
  refreshToken = createJWT(payloadJWT, '7d')

  const userToken = { refreshToken, ip, userAgent, user: user._id }

  await Token.create(userToken)
  res.status(StatusCodes.OK).json({ user: payloadJWT, refreshToken, accessToken })
}

const logout = async (req: Request, res: Response) => {
  await Token.findOneAndDelete({ user: req.user.user_id })

  res.status(StatusCodes.OK).json({ msg: 'user logged out!' })
}

const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body

  //send error if there is no token or it's invalid
  if (!refreshToken) {
    throw new CustomAPIError('AUTHENTICATED_ERROR', StatusCodes.UNAUTHORIZED, 'You are not authenticated!')
  }
  const existingToken = await Token.findOne({ refreshToken: refreshToken })
  const payload = isTokenValid(refreshToken)

  if (!existingToken) {
    throw new CustomAPIError('REFRESH_TOKEN_INVALID', StatusCodes.UNAUTHORIZED, 'Refresh token is not valid!')
  }

  if (!existingToken.isValid) {
    throw new CustomAPIError('INVALID_CREDENTIALS', StatusCodes.UNAUTHORIZED, 'Invalid Credentials')
  }

  const payloadJWT = createPayload(payload)
  const accessToken = createJWT(payloadJWT, '12h')

  res.status(StatusCodes.OK).json({ refreshToken: refreshToken, accessToken: accessToken })
}

export { login, register, logout, refreshToken }
