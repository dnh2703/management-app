import TotalEmployees from './TotalEmployees'
import TotalProjects from './TotalProjects'
import TotalCustomers from './TotalCustomers'
import TotalDepartments from './TotalDepartments'
import { useAppSelector } from '~/stores/hook'
import ProjectsInProgress from './ProjectsInProgress'
import MonthlyProjectReport from './MonthlyProjectReport'

const Overview = () => {
  const { isLoading, customers, departments, employees, projects } = useAppSelector((state) => state.dashboard)

  return (
    <>
      <div className='grid grid-cols-4 lg:grid-cols-8 gap-4'>
        <TotalEmployees isLoading={isLoading} employees={employees} />
        <TotalProjects isLoading={isLoading} projects={projects} />
        <TotalCustomers isLoading={isLoading} customers={customers} />
        <TotalDepartments isLoading={isLoading} departments={departments} />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4'>
        <ProjectsInProgress isLoading={isLoading} projects={projects} />
        <MonthlyProjectReport isLoading={isLoading} projects={projects} />
      </div>
    </>
  )
}

export default Overview
