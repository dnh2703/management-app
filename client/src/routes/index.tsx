import { useRoutes } from 'react-router-dom'
import publicRoutes from './public.routes'
import protectedRoutes from './protected.routes'
import { useAuth } from '~/hooks'
import { NotFoundPage } from '~/components'

const AppRoutes = () => {
  const { isAuth } = useAuth()

  const routes = isAuth ? protectedRoutes : publicRoutes

  const commonRoutes = [{ path: '*', element: <NotFoundPage /> }]

  const element = useRoutes([...routes, ...commonRoutes])

  return element
}

export default AppRoutes
