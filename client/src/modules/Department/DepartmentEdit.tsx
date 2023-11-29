import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import MultiAsyncSelect from 'react-select/async'
import { Button, Input, Spinner } from '~/components'
import { DepartmentSchema } from './department.schema'
import { MultiSelectOption } from '~/types/multiSelect.types'
import employeeApi from '~/services/modules/employee.services'
import { IEmployee } from '~/types/employee.types'
import { useNavigate, useParams } from 'react-router-dom'
import departmentApi from '~/services/modules/department.services'
import { useQuery } from '@tanstack/react-query'
import { DEPARTMENT_FORM_VALIDATE } from '~/constants/validation.constants'
import { handleAxiosError } from '~/utils/axios'
import { toast } from 'react-toastify'

const DepartmentEdit = () => {
  const { departmentId } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm<DepartmentSchema>()

  const onSubmit: SubmitHandler<DepartmentSchema> = async (data) => {
    try {
      setIsLoading(true)
      if (departmentId) {
        const employees_id = data.employees.map((item) => item.value)
        const res = await departmentApi.updateDepartment(departmentId, { ...data, employees_id })
        if (res.status === 200) {
          toast.success('Success! Department updated.')
          navigate('/departments')
        }
      }
    } catch (error) {
      handleAxiosError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const departmentQuery = useQuery({
    queryKey: ['product', departmentId],
    queryFn: () => {
      return departmentId
        ? departmentApi.getSingleDepartment(departmentId).then((res) => {
            const { department } = res.data
            setValue('name', department.name)
            setValue(
              'employees',
              department.employees.map((item: IEmployee) => {
                return {
                  value: item._id,
                  label: item.full_name
                }
              })
            )

            return res.data
          })
        : null
    },
    refetchOnWindowFocus: false
  })

  const employeeOptions = (_inputValue: string, callback: (options: MultiSelectOption[]) => void) => {
    employeeApi.getAllEmployeeWithoutDepartment().then((res) => {
      const result = res.data.ListEmployeeWithoutDepartment
      const options: MultiSelectOption[] = [...result].map((item: IEmployee) => {
        return {
          value: `${item._id}`,
          label: `${item.full_name}`
        }
      })
      setTimeout(() => {
        callback(options)
      }, 1000)
    })
  }

  return (
    <>
      <h3 className='font-bold text-2xl pb-4'>Edit Department</h3>
      <div className={`bg-white px-6 pb-8 rounded-lg shadow relative ${departmentQuery.isLoading && 'animate-pulse'}`}>
        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-x-4 gap-y-4  py-6'>
          <div className='col-span-2'>
            <label className='block mb-2 text-sm font-medium text-gray-900'>
              Name
              <span className='text-red-500 pl-1'>*</span>
            </label>
            <Input
              {...register('name', DEPARTMENT_FORM_VALIDATE.name)}
              isError={!!errors.name}
              errorMessage={errors.name?.message}
              type='text'
              disabled={departmentQuery.isLoading || isLoading}
              className='w-full'
            />
          </div>
          <div className='col-span-2'>
            <label className='block mb-2 text-sm font-medium text-gray-900'>Employees</label>
            <Controller
              name='employees'
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
                  loadOptions={employeeOptions}
                  isDisabled={departmentQuery.isLoading || isLoading}
                />
              )}
            />
          </div>

          <div className='col-span-2'>
            <Button type='submit' className=' bg-black text-white hover:opacity-80'>
              {isLoading ? 'Loading ...' : 'Save changes'}
            </Button>
          </div>
        </form>
        {departmentQuery.isLoading && (
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2'>
            <Spinner size='20' />
          </div>
        )}
      </div>
    </>
  )
}

export default DepartmentEdit
