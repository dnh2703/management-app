import { NavLink } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { useComponentVisible, useScrollLock } from '~/hooks'
import { Button } from '..'
import Header from '../Header'
import protectedRoutes from '~/routes/protected.routes'

const Sidebar = () => {
  const { isComponentVisible, ref, setIsComponentVisible } = useComponentVisible(false)

  useScrollLock(isComponentVisible)

  return (
    <>
      {isComponentVisible &&
        createPortal(
          <div className='inline-flex fixed top-0 md:hidden bg-black opacity-80 w-full h-full z-30'></div>,
          document.body
        )}

      <div className='absolute top-0 left-0 px-4 h-20 flex justify-between items-center z-20'>
        <Button
          className=' text-zinc-50 bg-zinc-700 border border-zinc-600 hover:text-zinc-100 hover:bg-zinc-600 text-xl'
          onClick={() => setIsComponentVisible(true)}
        >
          <i className='ri-arrow-right-double-line'></i>
        </Button>
      </div>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          !isComponentVisible && '-translate-x-full'
        } md:translate-x-0`}
        ref={ref}
      >
        <div className='h-full overflow-y-auto bg-white'>
          <Header />
          <div className='py-4 px-3 w-full'>
            {protectedRoutes[0].children.map((route, index) => {
              return (
                <NavLink
                  key={index}
                  to={route.path}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? ''
                      : isActive
                      ? 'px-3 py-3 rounded-md text-base font-medium bg-zinc-100 flex gap-2 items-center my-2'
                      : 'px-3 py-3 rounded-md text-base font-medium hover:bg-zinc-100 transition-all flex gap-2 items-center my-2'
                  }
                  onClick={() => setIsComponentVisible(false)}
                >
                  {route.icon}
                  <span className='capitalize'>{route.displayText}</span>
                </NavLink>
              )
            })}
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
