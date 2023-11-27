import { Outlet } from 'react-router-dom'
import { Avatar, Breadcrumb, Sidebar } from '~/components'

const MainLayout = () => {
  return (
    <div className='w-full h-full bg-zinc-100'>
      <Sidebar />
      <div className='p-4 p md:ml-64'>
        <Avatar />
        <Breadcrumb />
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
