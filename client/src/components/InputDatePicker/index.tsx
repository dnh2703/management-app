import { forwardRef } from 'react'
import { InputProps } from '../Input'

const InputDatePicker = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return (
    <>
      <div className='relative w-full'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
          <svg
            className='w-4 h-4 text-gray-500'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z' />
          </svg>
        </div>
        <input
          ref={ref}
          {...props}
          type='date'
          className='border disabled:bg-gray-200 disabled:opacity-50 border-zinc-400 text-gray-900 text-sm rounded-md block w-full ps-10 h-9 py-1 px-3 focus:outline-zinc-600'
          placeholder='Select date'
        />
      </div>
    </>
  )
})

export default InputDatePicker
