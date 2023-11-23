import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoadingPage from '~/components/LoadingPage'
import Login from '~/modules/Auth/Login'
import Register from '~/modules/Auth/Register'
const AuthLayout = lazy(() => import('../../layouts/AuthLayout'))

const Auth = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Suspense fallback={<LoadingPage />}>
            <AuthLayout />
          </Suspense>
        }
      >
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<Navigate to='login' />} />
      </Route>
    </Routes>
  )
}

export default Auth
