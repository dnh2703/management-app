import clsx from 'clsx'
import { forwardRef } from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ type, className, children, ...props }, ref) => {
  return (
    <button
      type={type}
      className={clsx(
        'inline-flex disabled:cursor-default cursor-pointer justify-center items-center whitespace-nowrap py-2 h-9 px-4 border rounded-md outline-1 focus-visible:outline-transparent focus-visible:ring-1 disabled:opacity-50 transition',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export { Button }
