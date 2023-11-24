import clsx from 'clsx'
import { forwardRef, useState } from 'react'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri'
import { BiSolidErrorCircle } from 'react-icons/bi'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean
  errorMessage?: string
  isShowIconError?: boolean
  isShowIconShowPassword?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { type, isError, isShowIconShowPassword, disabled, isShowIconError = false, className, errorMessage, ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
      <>
        <div>
          <div className='relative'>
            <input
              type={isShowIconShowPassword ? (showPassword ? 'text' : 'password') : type}
              ref={ref}
              disabled={disabled}
              className={clsx(
                `text-zinc-700 py-1 px-3 bg-transparent border h-9 rounded-md outline-1 ${
                  isError
                    ? 'border-red-500 border-2 focus:border-red-500 focus:outline-red-600'
                    : 'border-zinc-400 focus:outline-zinc-600'
                }  ${disabled && 'opacity-50 bg-zinc-200'} transition`,
                className
              )}
              {...props}
            />
            {isShowIconError && isError && (
              <BiSolidErrorCircle
                className={`absolute hidden md:flex top-1/2 -translate-y-1/2 -right-6 text-red-600 ${
                  !isError && 'hidden'
                }`}
              />
            )}
            {isShowIconShowPassword && (
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className={`absolute hidden cursor-pointer ${
                  disabled && 'opacity-50'
                } md:flex top-1/2 -translate-y-1/2 right-3`}
              >
                {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
              </div>
            )}
          </div>
          {isError && <p className='text-[0.8rem] mt-1 font-semibold text-red-500'>{errorMessage}</p>}
        </div>
      </>
    )
  }
)
Input.displayName = 'Input'

export { Input }
