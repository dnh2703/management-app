import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useGoogleLogin } from '@react-oauth/google'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Spinner } from '~/components'
import { RegisterSchema } from './register.schema'
import { AxiosError } from 'axios'
import authApi from '~/services/modules/auth.service'
import { handleAxiosError } from '~/utils/axios'
import { toast } from 'react-toastify'
import { handleLoadUser, handleLogInResponse } from '~/libs/auth.libs'

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterSchema>()

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<RegisterSchema> = (data) => {
    setIsLoading(true)

    authApi
      .register(data)
      .then((res) => {
        if (res.status === 201) {
          toast.success('Register successfully!', {
            position: toast.POSITION.TOP_RIGHT
          })
          navigate('/auth/login')
        }
      })
      .catch((error: AxiosError) => {
        handleAxiosError(error)
      })
      .finally(() => setIsLoading(false))
  }

  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setIsLoading(true)
      authApi
        .register({ googleAccessToken: codeResponse.access_token })
        .then((res) => {
          if (res.status === 200) {
            handleLoadUser(res)
            handleLogInResponse(res)
          }
        })
        .catch((err) => {
          handleAxiosError(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  })

  return (
    <div className='h-full flex items-center'>
      <form onSubmit={handleSubmit(onSubmit)} className='bg-white flex flex-col md:shadow-xl rounded-xl'>
        <div className='p-6 md:p-8 md:pb-0 flex gap-1 flex-col'>
          <h3 className='font-semibold text-zinc-800 text-2xl'>Register</h3>
          <p className='text-zinc-600 text-sm'>The beginning of the user's journey to access.</p>
        </div>
        <div className='p-6 md:p-8 md:pb-6 flex flex-col pt-0 gap-4'>
          <Input
            disabled={isLoading}
            className='placeholder-zinc-300 w-full'
            isError={!!errors.name}
            errorMessage={errors.name?.message}
            {...register('name', { required: 'Please fill the name' })}
            placeholder='username'
          />
          <Input
            disabled={isLoading}
            className='placeholder-zinc-300 w-full'
            isError={!!errors.email}
            errorMessage={errors.email?.message}
            {...register('email', { required: 'Please fill the email' })}
            placeholder='username@gmail.com'
          />

          <Input
            className='placeholder-zinc-300 w-full'
            isError={!!errors.password}
            errorMessage={errors.password?.message}
            disabled={isLoading}
            isShowIconShowPassword={true}
            placeholder='password'
            type='password'
            {...register('password', { required: 'Please fill password' })}
          />
          <Input
            className='placeholder-zinc-300 w-full'
            isError={!!errors.confirm_password}
            errorMessage={errors.confirm_password?.message}
            disabled={isLoading}
            isShowIconShowPassword={true}
            placeholder='confirm password'
            type='password'
            {...register('confirm_password', {
              required: 'Please fill confirm password',
              validate: (value: string) => {
                if (value !== watch('password')) {
                  return `Password does not match`
                }
              }
            })}
          />
        </div>

        <div className='p-6 md:p-8 md:pt-0 pt-0 flex flex-col'>
          <Button
            disabled={isLoading}
            type='submit'
            className='w-full bg-zinc-900 text-zinc-200 font-medium hover:bg-zinc-800'
          >
            Submit
            {isLoading && <Spinner size='4' className='ml-2' />}
          </Button>

          <p className='text-[13px] pt-2 text-center text-zinc-600'>
            Already have an account?{' '}
            <Link className='text-blue-500 hover:text-blue-600 font-semibold' to={'/auth/login'}>
              Login
            </Link>
          </p>

          <div className='relative mt-4'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t border-zinc-300' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-white px-2 text-zinc-500 font-medium'>Or continue with</span>
            </div>
          </div>
          <Button
            type='button'
            disabled={isLoading}
            className='inline-flex
           text-zinc-500 mt-4 cursor-pointer whitespace-nowrap
            rounded-md text-sm font-medium transition-colors
             focus-visible:outline-none focus-visible:ring-1 
             focus-visible:ring-ring disabled:pointer-events-none 
             disabled:opacity-50 border border-zinc-700 bg-transparent 
             shadow-sm hover:bg-zinc-100'
            onClick={() => loginGoogle()}
          >
            <svg role='img' viewBox='0 0 24 24' className='mr-2 h-4 w-4'>
              <path
                fill='currentColor'
                d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
              />
            </svg>
            Google
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
