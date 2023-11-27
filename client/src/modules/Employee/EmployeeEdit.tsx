import { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import MultiAsyncSelect from 'react-select/async'
import moment from 'moment'
import { Button, Input, InputDatePicker, SingleSelect, Spinner } from '~/components'
import { EMPLOYEE_FORM_VALIDATE } from '~/constants/validation.constants'
import { MultiSelectOption } from '~/types/multiSelect.types'
import { useNavigate, useParams } from 'react-router-dom'
import { EmployeeSchema } from './employee.schema'
import { EMPLOYEE_EXPERIENCE, EMPLOYEE_GENDER } from '~/constants/employee.constants'
import techStackApi from '~/services/modules/techStack.services'
import { ITechStack } from '~/types/techStack.types'
import { useQuery } from '@tanstack/react-query'
import employeeApi from '~/services/modules/employee.services'
import { toast } from 'react-toastify'
import { handleAxiosError } from '~/utils/axios'

const EmployeeEdit = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm<EmployeeSchema>()

  const techStackOptions = (_inputValue: string, callback: (options: MultiSelectOption[]) => void) => {
    techStackApi.getAllTechStack().then((res) => {
      const result = res.data.ListTechStack
      const options: MultiSelectOption[] = [...result].map((item: ITechStack) => {
        return {
          value: `${item._id}`,
          label: `${item.name}`
        }
      })
      setTimeout(() => {
        callback(options)
      }, 1)
    })
  }

  const { employeeId } = useParams()

  const employeeQuery = useQuery({
    queryKey: ['product', employeeId],
    queryFn: () => {
      return employeeId
        ? employeeApi.getSingleEmployee(employeeId).then((res) => {
            const { employee } = res.data
            const birthday = moment(employee.birthday).format('YYYY-MM-DD')
            setValue('last_name', employee.last_name)
            setValue('first_name', employee.first_name)
            setValue('birthday', birthday)
            setValue('phone_number', employee.phone_number)
            setValue('gender', employee.gender)
            setValue('experience', employee.experience)
            setValue(
              'tech_stacks',
              employee.tech_stacks.map((item: ITechStack) => {
                return {
                  value: item._id,
                  label: item.name
                }
              })
            )

            return res.data
          })
        : null
    },
    refetchOnWindowFocus: false
  })

  const onSubmit: SubmitHandler<EmployeeSchema> = (data) => {
    setIsLoading(true)

    if (employeeId) {
      employeeApi
        .updateEmployee(employeeId, { ...data, tech_stacks_id: data.tech_stacks.map((tech) => tech.value) })
        .then((res) => {
          if (res.status == 200) {
            toast.success('Success! Employee updated', {
              position: toast.POSITION.TOP_RIGHT
            })
            navigate('/employees')
          }
        })
        .catch((err) => handleAxiosError(err))
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  return (
    <>
      <h3 className='font-bold text-2xl pb-4'>Edit Employee</h3>
      <div className={`bg-white px-6 pb-8 rounded-lg shadow relative ${employeeQuery.isLoading && 'animate-pulse'}`}>
        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-x-4 gap-y-4  py-6'>
          <div className='col-span-2 sm:col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              First name
              <span className='text-red-500 pl-1'>*</span>
            </label>
            <Input
              disabled={isLoading || employeeQuery.isLoading}
              isError={!!errors.first_name}
              errorMessage={errors.first_name?.message}
              type='text'
              {...register('first_name', EMPLOYEE_FORM_VALIDATE.first_name)}
              className='w-full'
            />
          </div>
          <div className='col-span-2 sm:col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Last name
              <span className='text-red-500 pl-1'>*</span>
            </label>
            <Input
              disabled={isLoading || employeeQuery.isLoading}
              isError={!!errors.last_name}
              errorMessage={errors.last_name?.message}
              type='text'
              {...register('last_name', EMPLOYEE_FORM_VALIDATE.last_name)}
              className='w-full'
            />
          </div>

          <div className='col-span-2 sm:col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Gender
              <span className='text-red-500 pl-1'>*</span>
            </label>
            <SingleSelect
              disabled={isLoading || employeeQuery.isLoading}
              isError={!!errors.gender}
              errorMessage={errors.gender?.message}
              {...register('gender', EMPLOYEE_FORM_VALIDATE.gender)}
              className='w-full'
              options={EMPLOYEE_GENDER}
            />
          </div>

          <div className='col-span-2 sm:col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Experience
              <span className='text-red-500 pl-1'>*</span>
            </label>
            <SingleSelect
              disabled={isLoading || employeeQuery.isLoading}
              isError={!!errors.experience}
              errorMessage={errors.experience?.message}
              {...register('experience', EMPLOYEE_FORM_VALIDATE.experience)}
              className='w-full'
              options={EMPLOYEE_EXPERIENCE}
            />
          </div>

          <div className='col-span-2 sm:col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Birthday
              <span className='text-red-500 pl-1'>*</span>
            </label>
            <InputDatePicker {...register('birthday')} disabled={isLoading || employeeQuery.isLoading} />
          </div>
          <div className='col-span-2 sm:col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Phone number
              <span className='text-red-500 pl-1'>*</span>
            </label>
            <Input
              disabled={isLoading || employeeQuery.isLoading}
              isError={!!errors.phone_number}
              errorMessage={errors.phone_number?.message}
              {...register('phone_number')}
              className='w-full'
            />
          </div>
          <div className='col-span-2 sm:col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900'>Technology stack</label>
            <Controller
              name='tech_stacks'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <MultiAsyncSelect
                  classNames={{
                    input: () => '[&_input:focus]:ring-0 border-none',
                    control: (state) =>
                      state.isFocused ? 'border-zinc-600 outline-2 outline-zinc-600 shadow-none' : 'border-zinc-400'
                  }}
                  {...field}
                  isMulti
                  cacheOptions
                  defaultOptions
                  isDisabled={isLoading || employeeQuery.isLoading}
                  loadOptions={techStackOptions}
                />
              )}
            />
          </div>
          <div className='col-span-2'>
            <Button
              disabled={isLoading || employeeQuery.isLoading}
              type='submit'
              className=' bg-black text-white hover:opacity-80'
            >
              {isLoading || employeeQuery.isLoading ? 'Loading ...' : 'Save changes'}
            </Button>
          </div>
        </form>
        {employeeQuery.isLoading && (
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 flex justify-center items-center'>
            <Spinner size='20' />
          </div>
        )}
      </div>
    </>
  )
}

export default EmployeeEdit
