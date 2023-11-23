import axios from 'axios'
import { toast } from 'react-toastify'

export const handleAxiosError = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    toast.error(err.response?.data.msg)
  } else {
    toast.error('Something went wrong')
  }
}
