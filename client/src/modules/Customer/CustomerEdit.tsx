import { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import MultiAsyncSelect from 'react-select/async'
import { toast } from 'react-toastify'
import { Button, Input, SingleSelect } from '~/components'
import { CustomerSchema } from './customer.schema'
import { CUSTOMER_FORM_VALIDATE } from '~/constants/validation.constants'
import { MultiSelectOption } from '~/types/multiSelect.types'
import projectApi from '~/services/modules/project.services'
import { IProject } from '~/types/project.types'
import customerApi from '~/services/modules/customer.services'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { CUSTOMER_PRIORITY, CUSTOMER_STATUS } from '~/constants/customer.constants'
import { handleAxiosError } from '~/utils/axios'

const CustomerEdit = () => {
  const { customerId } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<CustomerSchema>()

  const customerQuery = useQuery({
    queryKey: ['product', customerId],
    queryFn: () => {
      return customerId
        ? customerApi.getSingleCustomer(customerId).then((res) => {
            const { customer } = res.data
            setValue('name', customer.name)
            setValue('location', customer.location)
            setValue('company', customer.company)
            setValue('country', customer.country)
            setValue('priority', customer.priority)
            setValue('status', customer.status)
            setValue(
              'projects',
              customer.projects.map((item: IProject) => {
                return {
                  value: item._id,
                  label: item.project_id
                }
              })
            )

            return res.data
          })
        : null
    },
    refetchOnWindowFocus: false
  })

  const projectOptions = (_inputValue: string, callback: (options: MultiSelectOption[]) => void) => {
    projectApi.getAllProjectWithoutCustomer().then((res) => {
      const result = res.data.ListProjectWithoutCustomer
      const options: MultiSelectOption[] = [...result].map((item: IProject) => {
        return {
          value: `${item._id}`,
          label: `${item.project_id}`
        }
      })
      setTimeout(() => {
        callback(options)
      }, 1000)
    })
  }

  const onSubmit: SubmitHandler<CustomerSchema> = (data) => {
    setIsLoading(true)

    const projects_id = getValues('projects').map((item) => item.value)

    if (customerId) {
      customerApi
        .updateCustomer(customerId, { ...data, projects_id })
        .then((res) => {
          console.log(res)
          if (res.status == 200) {
            toast.success('Success !', {
              position: toast.POSITION.TOP_RIGHT
            })
            navigate('/customers')
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
      <h3 className='font-bold text-2xl pb-4'>Edit Customer</h3>
      <div className='bg-white px-6 pb-8 rounded-lg shadow'>
        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-x-4 gap-y-4  py-6'>
          <div className='col-span-2 sm:col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Name
              <span className='text-red-500 pl-1'>*</span>
            </label>
            <Input
              disabled={isLoading || customerQuery.isLoading}
              isError={!!errors.name}
              errorMessage={errors.name?.message}
              type='text'
              {...register('name', CUSTOMER_FORM_VALIDATE.name)}
              className='w-full'
            />
          </div>
          <div className='col-span-2 sm:col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Company
              <span className='text-red-500 pl-1'>*</span>
            </label>
            <Input
              disabled={isLoading || customerQuery.isLoading}
              isError={!!errors.location}
              errorMessage={errors.location?.message}
              type='text'
              {...register('company', CUSTOMER_FORM_VALIDATE.location)}
              className='w-full'
            />
          </div>
          <div className='col-span-2 sm:col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Country
              <span className='text-red-500 pl-1'>*</span>
            </label>
            <Input
              disabled={isLoading || customerQuery.isLoading}
              isError={!!errors.location}
              errorMessage={errors.location?.message}
              type='text'
              {...register('country', CUSTOMER_FORM_VALIDATE.location)}
              className='w-full'
            />
          </div>
          <div className='col-span-2 sm:col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Location
              <span className='text-red-500 pl-1'>*</span>
            </label>
            <Input
              disabled={isLoading || customerQuery.isLoading}
              isError={!!errors.location}
              errorMessage={errors.location?.message}
              type='text'
              {...register('location', CUSTOMER_FORM_VALIDATE.location)}
              className='w-full'
            />
          </div>

          <div className='col-span-2 sm:col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Status
              <span className='text-red-500 pl-1'>*</span>
            </label>
            <SingleSelect
              disabled={isLoading || customerQuery.isLoading}
              isError={!!errors.status}
              errorMessage={errors.status?.message}
              {...register('status', CUSTOMER_FORM_VALIDATE.status)}
              className='w-full'
              options={CUSTOMER_STATUS}
            />
          </div>

          <div className='col-span-2 sm:col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Priority
              <span className='text-red-500 pl-1'>*</span>
            </label>
            <SingleSelect
              disabled={isLoading || customerQuery.isLoading}
              isError={!!errors.priority}
              errorMessage={errors.priority?.message}
              {...register('priority')}
              className='w-full'
              options={CUSTOMER_PRIORITY}
            />
          </div>
          <div className='col-span-2 sm:col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Projects</label>
            <Controller
              name='projects'
              control={control}
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
                  isDisabled={isLoading || customerQuery.isLoading}
                  loadOptions={projectOptions}
                />
              )}
            />
          </div>
          <div className='col-span-2'>
            <Button
              disabled={isLoading || customerQuery.isLoading}
              type='submit'
              className=' bg-black text-white hover:opacity-80'
            >
              {isLoading ? 'Loading ...' : 'Save changes'}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CustomerEdit
