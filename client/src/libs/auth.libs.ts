import { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { router } from '~/main'
import storage from '~/utils/storage'

const handleLogInResponse = (res: AxiosResponse) => {
  toast.success('Login successfully!', {
    position: toast.POSITION.TOP_RIGHT
  })
  storage.setAccessToken(res.data.accessToken)
  storage.setRefreshToken(res.data.refreshToken)
  router.navigate('/')
}

const handleLoadUser = (res: AxiosResponse) => {
  storage.setUser(res.data.user)
}

const logout = () => {
  storage.clearAccessToken()
  storage.clearRefreshToken()
  router.navigate('/auth/login')
}

export { logout, handleLogInResponse, handleLoadUser }
