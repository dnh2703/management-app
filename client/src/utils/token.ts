import { jwtDecode } from 'jwt-decode'
import storage from './storage'
import authApi from '~/services/modules/auth.service'

const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken: { exp: number } = jwtDecode(token)
    const currentTime: number = Date.now() / 1000 // Convert to seconds

    return decodedToken.exp < currentTime
  } catch (error) {
    return true // If token decoding fails, consider it as expired
  }
}

const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  try {
    const response = await authApi.refreshToken(refreshToken)

    // Extract the refreshed access token from the response
    const refreshedToken = response.data.accessToken
    console.log(response.data)
    return refreshedToken
  } catch (error) {
    // Handle the token refresh error
    throw new Error('Token refresh failed')
  }
}

const updateAccessToken = (newAccessToken: string) => {
  storage.clearAccessToken()
  storage.setAccessToken(newAccessToken)
}

export { isTokenExpired, updateAccessToken, refreshAccessToken }
