import { NavLink, useLocation } from 'react-router-dom'

const Breadcrumb = () => {
  const location = useLocation()

  if (location.pathname === '/') {
    return
  }

  return (
    <nav
      className='inline-flex px-5 py-3 mb-6 text-gray-700 border border-gray-200 rounded-lg bg-white'
      aria-label='Breadcrumb'
    >
      <ol className='inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse'>
        {location.pathname
          .split('/')
          .slice(1)
          .map((path, index) => {
            if (index == 0) {
              return (
                <li className='inline-flex items-center' key={index}>
                  <NavLink
                    to={`${path}`}
                    className='inline-flex items-center capitalize text-sm font-medium text-gray-700 hover:text-blue-600'
                  >
                    <svg
                      className='w-3 h-3 me-2.5'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z' />
                    </svg>
                    {path}
                  </NavLink>
                </li>
              )
            }

            return (
              <li key={index}>
                <div className='flex items-center'>
                  <svg
                    className='rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 '
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 6 10'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='m1 9 4-4-4-4'
                    />
                  </svg>
                  <NavLink
                    to={location.pathname}
                    className='ms-1 cursor-pointer text-sm capitalize font-medium text-gray-700 hover:text-blue-600 md:ms-2'
                  >
                    {path}
                  </NavLink>
                </div>
              </li>
            )
          })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
