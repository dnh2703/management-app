import axios, { AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { DOMAIN } from '~/constants/service.constants'
import { logout } from '~/libs/auth.libs'
import storage from '~/utils/storage'
import { isTokenExpired, refreshAccessToken, updateAccessToken } from '~/utils/token'

const axiosPrivate: AxiosInstance = axios.create({
  baseURL: `${`${DOMAIN}/api/v1/`}`,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosPrivate.interceptors.request.use(
  async function (req) {
    const accessToken = storage.getAccessToken()
    const refreshToken = storage.getRefreshToken()

    if (refreshToken && !isTokenExpired(refreshToken)) {
      if (accessToken && !isTokenExpired(accessToken)) {
        req.headers['Authorization'] = `Bearer ${accessToken}`
      } else {
        const newAccessToken = await refreshAccessToken(refreshToken)
        updateAccessToken(newAccessToken)
        req.headers['Authorization'] = `Bearer ${newAccessToken}`
      }
    }
    return req
  },
  (err) => console.log(err)
)

axiosPrivate.interceptors.response.use(
  function (res) {
    return res
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      logout()
      toast.error(`${err.response.data.msg}`)
    }
    // if (err.response && err.response.status === 500) {
    //   logout()
    //   toast.error(`Internal server error`)
    // }
    return Promise.reject(err)
  }
)

export default axiosPrivate
