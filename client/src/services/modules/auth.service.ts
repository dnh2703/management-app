import axiosPublic from '../config/axios.public'
import { IAuthAPIBody } from '~/types/auth.types'

const authApi = {
  login: (data: IAuthAPIBody) => axiosPublic.post('auth/login', data),
  register: (data: IAuthAPIBody) => axiosPublic.post('auth/register', data),
  refreshToken: (token: string) => axiosPublic.post('auth/token', { refreshToken: token })
}

export default authApi
