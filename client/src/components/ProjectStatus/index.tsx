import { HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineClock, HiOutlineQuestionMarkCircle } from 'react-icons/hi'
interface ProjectStatusProps {
  current_status: 'in progress' | 'canceled' | 'done' | 'pending'
}

const ProjectStatus = ({ current_status }: ProjectStatusProps) => {
  const ICON_STATUS = {
    canceled: <HiOutlineXCircle />,
    done: <HiOutlineCheckCircle />,
    'in progress': <HiOutlineClock />,
    pending: <HiOutlineQuestionMarkCircle />
  }

  const COLOR_STATUS = {
    done: 'text-green-500 bg-green-200',
    pending: 'text-yellow-500 bg-yellow-200',
    canceled: 'text-red-500 bg-red-200',
    'in progress': 'text-blue-500 bg-blue-200'
  }

  return (
    <div className={`inline-flex items-center gap-1 rounded-full px-1.5 py-1 ${COLOR_STATUS[current_status]}`}>
      <span className='text-lg'>{ICON_STATUS[current_status]}</span>
      <span className='capitalize text-sm mr-2 font-medium'>{current_status}</span>
    </div>
  )
}

export default ProjectStatus
