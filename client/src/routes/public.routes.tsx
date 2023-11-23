import { Navigate } from 'react-router-dom'
import AuthRoutes from '../pages/Auth/index'

const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes />
  },
  {
    path: '*',
    element: <Navigate to='/auth/login' />
  }
]

export default publicRoutes
