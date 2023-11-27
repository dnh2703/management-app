import { HiUsers } from 'react-icons/hi2'
import { LoadingSmallCard } from '~/components'
import { IEmployee } from '~/types/employee.types'

interface TotalEmployeesProps {
  isLoading: boolean
  employees: IEmployee[]
}

const TotalEmployees = ({ employees, isLoading }: TotalEmployeesProps) => {
  if (isLoading) {
    return <LoadingSmallCard />
  }

  return (
    <div className='col-span-2 bg-white rounded-md h-48 px-6 py-4'>
      <div className='flex flex-col items-center'>
        <div className='h-8 w-8 flex justify-center text-sm items-center rounded-full bg-blue-200 text-blue-600'>
          <HiUsers />
        </div>
        <h3 className='font-bold text-4xl pt-2'>{employees?.length}</h3>
        <p className='text-zinc-600 text-sm font-medium'>Total employees</p>
        <p className='text-blue-600 text-sm pt-6 font-bold'>
          {((employees.filter((item) => item.gender == 'male')?.length / employees?.length) * 100).toFixed(0)}% Male
        </p>
      </div>
    </div>
  )
}

export default TotalEmployees
