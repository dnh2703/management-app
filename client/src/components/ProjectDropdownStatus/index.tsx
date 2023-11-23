import { IoIosArrowDown } from 'react-icons/io'
import { Button } from '..'
import { PROJECT_STATUS } from '~/constants/project.constants'
import { useDisclosure } from '~/hooks'
import { useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

interface ProjectDropdownStatusProps {
  className: string
}

const ProjectDropdownStatus = ({ className }: ProjectDropdownStatusProps) => {
  const { isOpen, toggle, close } = useDisclosure(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const status = searchParams.get('status')

  const dropdownRef = useRef<HTMLFormElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      close()
    }
  }

  const { register, handleSubmit, watch, setValue } = useForm<{ status: string[] }>()

  const onSubmit: SubmitHandler<{ status: string[] }> = () => {}

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)

    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  useEffect(() => {
    if (status) {
      setValue('status', [...status.split(',')])
    } else {
      setValue('status', [])
    }

    const subscription = watch((value) => {
      if (Array.isArray(value.status)) {
        const params = value.status.join(',')
        setSearchParams((prev) => {
          prev.set('status', params)
          return prev
        })
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [watch])

  return (
    <>
      <div className={`relative ${className}`}>
        <Button
          className='border-zinc-300 flex gap-3 text-sm font-semibold hover:bg-zinc-50 w-full'
          onClick={toggle}
          ref={buttonRef}
        >
          <IoIosArrowDown />
          Status
        </Button>
        <form
          className={`${
            !isOpen && 'hidden'
          } absolute -right-2 top-11 rounded-md z-10 shadow bg-white border px-4 py-2 w-48`}
          ref={dropdownRef}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h6 className='mb-3 text-sm font-medium text-gray-900 dark:text-white'>Choose status</h6>
          <ul className='space-y-2 text-sm' aria-labelledby='filterDropdownButton'>
            {PROJECT_STATUS.map((item, index) => {
              return (
                <li className='flex items-center' key={index}>
                  <input
                    id='status'
                    {...register('status')}
                    type='checkbox'
                    value={item.value}
                    className='w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 focus:ring-2'
                  />
                  <label htmlFor='status' className='ml-2 text-sm font-medium text-gray-900'>
                    {item.label}
                  </label>
                </li>
              )
            })}
          </ul>
        </form>
      </div>
    </>
  )
}

export default ProjectDropdownStatus
