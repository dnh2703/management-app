import { Button, Input, InputDatePicker, SingleSelect, Spinner } from '~/components'
import AsyncSelect from 'react-select/async'
import MultipleSelect from 'react-select'
import techStackApi from '~/services/modules/techStack.services'
import { MultiSelectOption } from '~/types/multiSelect.types'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { ProjectSchema } from './project.schema'
import departmentApi from '~/services/modules/department.services'
import { IDepartment } from '~/types/department.types'
import { ITechStack } from '~/types/techStack.types'
import { PROJECT_PRIORITY, PROJECT_STATUS, PROJECT_TYPES } from '~/constants/project.constants'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IEmployee } from '~/types/employee.types'
import { PROJECT_FORM_VALIDATE } from '~/constants/validation.constants'
import projectApi from '~/services/modules/project.services'
import { useQuery } from '@tanstack/react-query'
import { ICustomer } from '~/types/customer.types'
import { router } from '~/main'
import { toast } from 'react-toastify'
import { handleAxiosError } from '~/utils/axios'
import moment from 'moment'

const ProjectEdit = () => {
  const [employeeOptions, setEmployeeOptions] = useState<MultiSelectOption[]>()
  const [isLoading, setIsLoading] = useState(false)
  const [owner, setOwner] = useState<ICustomer>()
  const { projectId } = useParams()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ProjectSchema>()

  const onSubmit: SubmitHandler<ProjectSchema> = async (data) => {
    setIsLoading(true)
    try {
      const department_id = data.department.value
      const tech_stacks_id = data.tech_stacks.map((item) => item.value)
      const employees_id = data.employees.map((item) => item.value)
      const res = await projectApi.updateProject(projectId as string, {
        ...data,
        department_id,
        employees_id,
        tech_stacks_id
      })

      if (res.status === 200) {
        toast.success('Update successfully')
        navigate('/projects')
      }
    } catch (error) {
      handleAxiosError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const projectQuery = useQuery({
    queryKey: ['product', projectId],
    queryFn: () => {
      return projectId
        ? projectApi.getSingleProject(projectId).then((res) => {
            const { project } = res.data
            const start_date = moment(project.start_date).format('YYYY-MM-DD')
            const end_date = moment(project.end_date).format('YYYY-MM-DD')

            setOwner(project.customer)
            setValue('title', project.title)
            setValue('status', project.status)
            setValue('start_date', start_date)
            setValue('end_date', end_date)
            setValue('project_type', project.project_type)
            setValue('priority', project.priority)
            setValue(
              'tech_stacks',
              project.tech_stacks.map((item: ITechStack) => {
                return {
                  value: item._id,
                  label: item.name
                }
              })
            )
            setValue('department', { value: project.department._id, label: project.department.name })
            setValue(
              'employees',
              project.employees.map((item: IEmployee) => {
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
      <h3 className='font-bold text-2xl'>Edit Project </h3>

      <div
        className={`bg-white px-6 pb-8 mt-4 rounded-lg shadow relative ${projectQuery.isLoading && 'animate-pulse'}`}
      >
        <h4
          onClick={() => {
            if (owner) {
              router.navigate(`/customers/${owner._id}`)
            }
          }}
          className={`border border-zinc-800 ${
            owner && 'cursor-pointer hover:animate-pulse'
          } px-2 py-1 mt-5 text-xl inline-block rounded-md font-semibold animation`}
        >
          {owner ? owner.name : 'No owner'}
        </h4>
        <form action='' className='grid grid-cols-2 gap-x-4 gap-y-4  py-6 ' onSubmit={handleSubmit(onSubmit)}>
          <div className=' col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Title
              <span className='text-red-500 pl-1'>*</span>
            </label>
            <Input
              isError={!!errors.title}
              disabled={projectQuery.isLoading || isLoading}
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
              {...register('status', PROJECT_FORM_VALIDATE.status)}
              disabled={projectQuery.isLoading || isLoading}
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
              {...register('project_type', PROJECT_FORM_VALIDATE.project_type)}
              disabled={projectQuery.isLoading || isLoading}
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
              {...register('priority', PROJECT_FORM_VALIDATE.priority)}
              disabled={projectQuery.isLoading || isLoading}
              options={PROJECT_PRIORITY}
              className='w-full'
            />
          </div>

          <div className='col-span-2 sm:col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Start date</label>
            <InputDatePicker {...register('start_date')} disabled={projectQuery.isLoading || isLoading} />
          </div>
          <div className='col-span-2 sm:col-span-1'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>End date</label>
            <InputDatePicker {...register('end_date')} disabled={projectQuery.isLoading || isLoading} />
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
                  classNames={{
                    input: () => '[&_input:focus]:ring-0 border-none',
                    control: (state) =>
                      state.isFocused ? 'border-zinc-600 outline-2 outline-zinc-600 shadow-none' : 'border-zinc-400'
                  }}
                  {...field}
                  isDisabled={projectQuery.isLoading || isLoading}
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
                  classNames={{
                    input: () => '[&_input:focus]:ring-0 border-none',
                    control: (state) =>
                      state.isFocused ? 'border-zinc-600 outline-2 outline-zinc-600 shadow-none' : 'border-zinc-400'
                  }}
                  {...field}
                  isMulti
                  cacheOptions
                  isDisabled={projectQuery.isLoading || isLoading}
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
              // rules={PROJECT_FORM_VALIDATE.employees}
              render={({ field }) => (
                <MultipleSelect
                  classNames={{
                    input: () => '[&_input:focus]:ring-0 border-none',
                    control: (state) =>
                      state.isFocused ? 'border-zinc-600 outline-2 outline-zinc-600 shadow-none' : 'border-zinc-400'
                  }}
                  {...field}
                  isMulti
                  isDisabled={projectQuery.isLoading || isLoading}
                  options={employeeOptions}
                />
              )}
            />
          </div>
          <div className='col-span-2'>
            <Button
              type='submit'
              disabled={isLoading || projectQuery.isLoading}
              className=' bg-black text-white hover:opacity-80'
            >
              {isLoading ? 'Loading ...' : 'Submit'}
            </Button>
          </div>
        </form>

        {projectQuery.isLoading && (
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 flex justify-center items-center'>
            <Spinner size='20' />
          </div>
        )}
      </div>
    </>
  )
}

export default ProjectEdit
