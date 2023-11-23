import { BiTask } from 'react-icons/bi'
import { LoadingSmallCard } from '~/components'
import { IProject } from '~/types/project.types'
import { findMostFrequentElement } from '~/utils/element'

interface TotalProjectsProps {
  isLoading: boolean
  projects: IProject[]
}

const TotalProjects = ({ isLoading, projects }: TotalProjectsProps) => {
  if (isLoading) {
    return <LoadingSmallCard />
  }
  const ListTechStack = projects?.map((project) => project?.tech_stacks?.map((item) => item.name)).flat()

  return (
    <div className='col-span-2 bg-white rounded-md h-48 px-6 py-4'>
      <div className='flex flex-col items-center'>
        <div className='h-8 w-8 flex justify-center text-sm items-center rounded-full bg-green-200 text-green-600'>
          <BiTask />
        </div>
        <h3 className='font-bold text-4xl pt-2'>{projects?.length}</h3>
        <p className='text-zinc-600 text-sm font-medium'>Total projects</p>
        <p className='text-green-600 text-sm pt-6 font-bold'>
          {findMostFrequentElement(ListTechStack)?.name}{' '}
          {((findMostFrequentElement(ListTechStack)?.times / ListTechStack?.length) * 100).toFixed(2)}%
        </p>
      </div>
    </div>
  )
}

export default TotalProjects
