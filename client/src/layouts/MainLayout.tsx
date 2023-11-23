import { Outlet } from 'react-router-dom'
import { Avatar, Sidebar } from '~/components'

const MainLayout = () => {
  return (
    <div className='w-full h-full bg-zinc-100'>
      <Sidebar />
      <div className='p-4 p md:ml-64'>
        <Avatar />
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
