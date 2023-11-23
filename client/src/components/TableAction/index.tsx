import { TbEdit, TbTrash } from 'react-icons/tb'
import Swal from 'sweetalert2'

interface TableActionProps {
  handleDeleteEvent: () => void
  handleEditEvent: () => void
}

const TableAction = ({ handleDeleteEvent, handleEditEvent }: TableActionProps) => {
  return (
    <div className=' flex justify-center relative'>
      <div
        onClick={handleEditEvent}
        className='cursor-pointer relative  px-2 py-1 rounded-md hover:bg-blue-200 transition-colors group'
      >
        <TbEdit className='text-blue-500 group-hover:text-blue-600' />
      </div>
      <div
        onClick={() => {
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              handleDeleteEvent()
            }
          })
        }}
        className='cursor-pointer relative  px-2 py-1 rounded-md hover:bg-red-200 transition-colors'
      >
        <TbTrash className='text-red-500 group-hover:text-red-600' />
      </div>
    </div>
  )
}

export default TableAction
