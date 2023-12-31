import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import MultiAsyncSelect from 'react-select/async'
import { Button, Input } from '~/components'
import { DepartmentSchema } from './department.schema'
import { MultiSelectOption } from '~/types/multiSelect.types'
import employeeApi from '~/services/modules/employee.services'
import { IEmployee } from '~/types/employee.types'
import departmentApi from '~/services/modules/department.services'
import { toast } from 'react-toastify'
import { handleAxiosError } from '~/utils/axios'
import { useNavigate } from 'react-router-dom'

const DepartmentForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<DepartmentSchema>()

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

  const onSubmit: SubmitHandler<DepartmentSchema> = async (data) => {
    try {
      setIsLoading(true)
      const employees_id = data.employees ? data.employees.map((item) => item.value) : []
      const res = await departmentApi.createDepartment({ ...data, employees_id })

      if (res.status === 201) {
        toast.success('Success! Department created')
        navigate('/departments')
      }
    } catch (err) {
      handleAxiosError(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <h3 className='font-bold text-2xl pb-4'>New Department</h3>
      <div className='bg-white px-6 pb-8 rounded-lg shadow'>
        <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-x-4 gap-y-4  py-6'>
          <div className='col-span-2'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Name
              <span className='text-red-500 pl-1'>*</span>
            </label>
            <Input
              {...register('name')}
              isError={!!errors.name}
              disabled={isLoading}
              errorMessage={errors.name?.message}
              type='text'
              className='w-full'
            />
          </div>
          <div className='col-span-2'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Employees</label>
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
                  loadOptions={employeeOptions}
                  isDisabled={isLoading}
                />
              )}
            />
          </div>

          <div className='col-span-2'>
            <Button type='submit' disabled={isLoading} className=' bg-black text-white hover:opacity-80'>
              {isLoading ? 'Loading ...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default DepartmentForm
