import { HalfDoughnutChart } from '~/components'
import LoadingBigCard from '~/components/LoadingBigCard'
import { IProject } from '~/types/project.types'

interface ProjectsInProgressProps {
  isLoading: boolean
  projects: IProject[]
}

const ProjectsInProgress = ({ isLoading, projects }: ProjectsInProgressProps) => {
  const PROJECT_IN_PROGRESS = projects?.filter((project) => project.status == 'in progress').length
  const PROJECT_DONE = projects?.filter((project) => project.status == 'done').length

  if (isLoading) {
    return <LoadingBigCard />
  }

  return (
    <div className='bg-white w-full mt-4 px-6 py-4 rounded-md'>
      <h3 className='text-xl font-bold pb-10'>Project overview</h3>
      <HalfDoughnutChart
        labels={['In progress', 'Total projects']}
        data={[PROJECT_IN_PROGRESS, (PROJECT_DONE + PROJECT_IN_PROGRESS) / 2]}
        backgroundColor={['rgba(231, 76, 60, 1)', '#d1d5db']}
      />
      <div className='relative'>
        <p className='text-center font-semibold text-sm pt-2 pb-4'>That is the percentage of projects in progress</p>
        <h3 className='absolute text-7xl -top-20 left-1/2 -translate-x-1/2 font-bold'>
          {((PROJECT_IN_PROGRESS / (PROJECT_DONE + PROJECT_IN_PROGRESS)) * 100).toFixed(1)}%
        </h3>
      </div>
    </div>
  )
}

export default ProjectsInProgress
