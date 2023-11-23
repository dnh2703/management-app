import axios, { AxiosInstance } from 'axios'
import { DOMAIN } from '~/constants/service.constants'

const axiosPublic: AxiosInstance = axios.create({
  baseURL: `${DOMAIN}/api/v1/`,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosPublic
