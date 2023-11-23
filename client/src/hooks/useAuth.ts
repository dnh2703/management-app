import storage from '~/utils/storage'

const useAuth = () => {
  const isAuth = !!storage.getRefreshToken()

  return { isAuth }
}

export default useAuth
