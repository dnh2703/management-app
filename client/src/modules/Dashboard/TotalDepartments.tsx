import { PiBuildingsBold } from 'react-icons/pi'
import { LoadingSmallCard } from '~/components'
import { IDepartment } from '~/types/department.types'

interface TotalDepartmentsProps {
  isLoading: boolean
  departments: IDepartment[]
}

const TotalDepartments = ({ departments, isLoading }: TotalDepartmentsProps) => {
  if (isLoading) {
    return <LoadingSmallCard />
  }

  return (
    <div className='col-span-2 bg-white rounded-md h-48 px-6 py-4'>
      <div className='flex flex-col items-center'>
        <div className='h-8 w-8 flex justify-center text-sm items-center rounded-full bg-yellow-200 text-yellow-600'>
          <PiBuildingsBold />
        </div>
        <h3 className='font-bold text-4xl pt-2'>{departments?.length}</h3>
        <p className='text-zinc-600 text-sm font-medium whitespace-nowrap'>Total departments</p>
        {/* <p className='text-yellow-600 text-sm pt-6 font-bold'>25% DU25</p> */}
      </div>
    </div>
  )
}

export default TotalDepartments
