import { IProject } from '~/types/project.types'
import { BarChart } from '~/components'
import LoadingBigCard from '~/components/LoadingBigCard'

interface MonthlyProjectReportProps {
  isLoading: boolean
  projects: IProject[]
}

const MonthlyProjectReport = ({ isLoading, projects }: MonthlyProjectReportProps) => {
  const months = [
    { label: 'Q1', min: 0, max: 3 },
    { label: 'Q2', min: 3, max: 6 },
    { label: 'Q3', min: 6, max: 9 },
    { label: 'Q4', min: 9, max: 12 }
  ]

  const data = months.map((month) => {
    return projects.filter((project) =>
      project.start_date
        ? new Date(project.start_date).getMonth() > month.min && new Date(project.start_date).getMonth() <= month.max
        : false
    ).length
  })

  if (isLoading) {
    return <LoadingBigCard />
  }

  return (
    <div className='bg-white w-full mt-4 px-6 py-4 rounded-md'>
      <h3 className='text-xl font-bold pb-10'>Quarterly report</h3>
      <BarChart labels={months.map((item) => item.label)} data={data} backgroundColor={['#0ea5e9']} />
      <div className='relative'>
        <p className='text-center font-semibold text-sm pt-2 pb-4'>That is the number of projects each quarter</p>
      </div>
    </div>
  )
}

export default MonthlyProjectReport
