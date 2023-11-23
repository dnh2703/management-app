import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='max-w-sm flex md:h-screen px-0 md:px-6 py-8 lg:py-0 mx-auto'>
      <Outlet />
    </div>
  )
}

export default AuthLayout
