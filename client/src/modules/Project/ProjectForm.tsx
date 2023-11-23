import { Button, Input, InputDatePicker, SingleSelect } from '~/components'
import AsyncSelect from 'react-select/async'
import MultipleSelect from 'react-select'
import { toast } from 'react-toastify'
import techStackApi from '~/services/modules/techStack.services'
import { MultiSelectOption } from '~/types/multiSelect.types'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ProjectSchema } from './project.schema'
import departmentApi from '~/services/modules/department.services'
import { IDepartment } from '~/types/department.types'
import { ITechStack } from '~/types/techStack.types'
import { PROJECT_PRIORITY, PROJECT_STATUS, PROJECT_TYPES } from '~/constants/project.constants'
import { useEffect, useState } from 'react'
import { IEmployee } from '~/types/employee.types'
import { PROJECT_FORM_VALIDATE } from '~/constants/validation.constants'
import projectApi from '~/services/modules/project.services'
import { useNavigate } from 'react-router-dom'
import { handleAxiosError } from '~/utils/axios'

const ProjectForm = () => {
  const [employeeOptions, setEmployeeOptions] = useState<MultiSelectOption[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm<ProjectSchema>()

  const onSubmit: SubmitHandler<ProjectSchema> = async (data) => {
    setIsLoading(true)
    try {
      const department_id = data.department.value
      const tech_stacks_id = data.tech_stacks.map((item) => item.value)
      const employees_id = data.employees.map((item) => item.value)

      const res = await projectApi.createProject({
        ...data,
        tech_stacks_id,
        employees_id,
        department_id
      })

      if (res.status === 201) {
        toast.success('submit successfully')
        navigate('/projects')
      }
    } catch (error) {
      handleAxiosError(error)
    } finally {
      setIsLoading(false)
    }
  }

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

  const departmentOptions = (_inputValue: string, callback: (options: MultiSelectOption[]) => void) => {
    departmentApi.getAllDepartment().then((res) => {
      const result = res.data.ListDepartment
      const options: MultiSelectOption[] = [...result].map((item: IDepartment) => {
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

  useEffect(() => {
    const subscription = watch((value) => {
      if (value?.department?.value) {
        departmentApi.getAllEmployeeInDepartment(value.department.value).then((res) => {
          const result = res.data.employees
          const options: MultiSelectOption[] = [...result].map((item: IEmployee) => {
            return {
              value: `${item._id}`,
              label: `${item.full_name}`
            }
          })
          setEmployeeOptions(options)
        })
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <>
      <h3 className='font-bold text-2xl pb-4'>New Project</h3>
      <div className='bg-white px-6 pb-8 rounded-lg shadow'>
        <form action='' className='grid grid-cols-2 gap-x-4 gap-y-4  py-6' onSubmit={handleSubmit(onSubmit)}>
          <div className=' col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Title
              <span className='text-red-500 pl-1'>*</span>
            </label>
            <Input
              disabled={isLoading}
              isError={!!errors.title}
              errorMessage={errors.title?.message}
              {...register('title', PROJECT_FORM_VALIDATE.title)}
              type='text'
              className='w-full'
            />
          </div>
          <div className=' col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Status
              <span className='text-red-500 pl-1'>*</span>
            </label>
            <SingleSelect
              disabled={isLoading}
              errorMessage={errors.status?.message}
              {...register('status', PROJECT_FORM_VALIDATE.status)}
              className='w-full'
              options={PROJECT_STATUS}
            />
          </div>

          <div className=' col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Project type
              <span className='text-red-500 pl-1'>*</span>
            </label>
            <SingleSelect
              disabled={isLoading}
              {...register('project_type', PROJECT_FORM_VALIDATE.project_type)}
              className='w-full'
              options={PROJECT_TYPES}
            />
          </div>

          <div className=' col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Priority
              <span className='text-red-500 pl-1'>*</span>
            </label>
            <SingleSelect
              disabled={isLoading}
              {...register('priority', PROJECT_FORM_VALIDATE.priority)}
              options={PROJECT_PRIORITY}
              className='w-full'
            />
          </div>
          <div className='col-span-2 sm:col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Start date</label>
            <InputDatePicker {...register('start_date')} disabled={isLoading} />
          </div>
          <div className='col-span-2 sm:col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>End date</label>
            <InputDatePicker {...register('end_date')} disabled={isLoading} />
          </div>

          <div className=' col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Department
              <span className='text-red-500 pl-1'>*</span>
            </label>
            <Controller
              name='department'
              control={control}
              rules={PROJECT_FORM_VALIDATE.department}
              render={({ field }) => (
                <AsyncSelect
                  disabled={isLoading}
                  classNames={{
                    input: () => '[&_input:focus]:ring-0 border-none',
                    control: (state) =>
                      state.isFocused ? 'border-zinc-600 outline-2 outline-zinc-600 shadow-none' : 'border-zinc-400'
                  }}
                  {...field}
                  cacheOptions
                  defaultOptions
                  loadOptions={departmentOptions}
                />
              )}
            />
          </div>
          <div className=' col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Technology stack
              <span className='text-red-500 pl-1'>*</span>
            </label>
            <Controller
              name='tech_stacks'
              control={control}
              rules={PROJECT_FORM_VALIDATE.tech_stack}
              render={({ field }) => (
                <AsyncSelect
                  disabled={isLoading}
                  classNames={{
                    input: () => '[&_input:focus]:ring-0 border-none',
                    control: (state) =>
                      state.isFocused ? 'border-zinc-600 outline-2 outline-zinc-600 shadow-none' : 'border-zinc-400'
                  }}
                  {...field}
                  isMulti
                  cacheOptions
                  defaultOptions
                  loadOptions={techStackOptions}
                />
              )}
            />
          </div>
          <div className=' col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Employees
              <span className='text-red-500 pl-1'>*</span>
              <small className='block text-gray-500'>Please choose department first</small>
            </label>
            <Controller
              name='employees'
              control={control}
              rules={PROJECT_FORM_VALIDATE.employees}
              render={({ field }) => (
                <MultipleSelect
                  disabled={isLoading}
                  classNames={{
                    input: () => '[&_input:focus]:ring-0 border-none',
                    control: (state) =>
                      state.isFocused ? 'border-zinc-600 outline-2 outline-zinc-600 shadow-none' : 'border-zinc-400'
                  }}
                  {...field}
                  isMulti
                  options={employeeOptions}
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

export default ProjectForm
