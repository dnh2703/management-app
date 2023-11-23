import { useEffect, useRef } from 'react'
import { useDisclosure } from '~/hooks'
import { logout } from '~/libs/auth.libs'
import storage from '~/utils/storage'

const Avatar = () => {
  const { isOpen, close, toggle } = useDisclosure(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)

  const user = storage.getUser()

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      avatarRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      !avatarRef.current.contains(event.target as Node)
    ) {
      close()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return (
    <div className='flex justify-end relative pb-4'>
      <div
        className='inline-flex items-center cursor-pointer justify-center w-10 h-10 overflow-hidden bg-white rounded-full'
        onClick={() => toggle()}
        ref={avatarRef}
      >
        <span className='font-medium text-gray-600 '>
          {user?.name
            .split(' ')
            .map((item: string) => item[0])
            .join('')}
        </span>
      </div>

      <div
        id='userDropdown'
        className={`${
          isOpen ? '' : 'hidden'
        } top-12 absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
        ref={dropdownRef}
      >
        <div className='px-4 py-3 my-1 text-sm text-gray-900'>
          <div>{user?.name}</div>
          <div className='font-medium truncate'>{user?.email}</div>
        </div>
        <div className='py-1'>
          <a onClick={logout} className='block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100  '>
            Sign out
          </a>
        </div>
      </div>
    </div>
  )
}

export default Avatar
