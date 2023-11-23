import { useEffect } from 'react'
import Overview from '~/modules/Dashboard/Overview'
import { getDataDashboardAction } from '~/stores/dashboard/dashboardSlice'
import { useAppDispatch } from '~/stores/hook'

const Dashboard = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getDataDashboardAction())
  }, [dispatch])

  return (
    <>
      <div className='pb-4'>
        <h3 className='font-bold text-2xl'>Welcome back!</h3>
        <p className='text-zinc-500 font-lg font-medium'>Here's a list of your tasks for this month!</p>
      </div>
      <Overview />
    </>
  )
}

export default Dashboard
