import clsx from 'clsx'
import { forwardRef } from 'react'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: {
    label: string
    value: string
  }[]
  isError?: boolean
  errorMessage?: string
}

const SingleSelect = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, isError, options = [], errorMessage, ...props }, ref) => {
    return (
      <div className='relative'>
        <select
          className={clsx(
            `inline-flex cursor-pointer justify-center items-center whitespace-nowrap h-9 px-2 border rounded-md outline-1 ${
              isError
                ? 'border-red-500 border-2 focus:border-red-500 focus:outline-red-600'
                : 'border-zinc-400 focus-visible:outline-zinc-600 focus:outline-zinc-600'
            } disabled:opacity-50 disabled:cursor-default disabled:bg-zinc-200 transition`,
            className
          )}
          ref={ref}
          {...props}
        >
          {options.length ? (
            options.map((option, index) => {
              return (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              )
            })
          ) : (
            <option>No options</option>
          )}
        </select>

        {isError && <p className='text-[0.8rem] font-semibold text-red-500 pt-1'>{errorMessage}</p>}
      </div>
    )
  }
)

SingleSelect.displayName = 'SingleSelect'

export { SingleSelect }
