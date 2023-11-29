import { useEffect } from 'react'
import { MdAddCircleOutline } from 'react-icons/md'
import { useSearchParams } from 'react-router-dom'
import { Button, InputSearch, NotFoundTable, Table, TableAction } from '~/components'
import SkeletonTable from '~/components/SkeletonTable'
import { DEPARTMENT_FILED_HEADINGS } from '~/constants/thead.constants'
import { usePagination } from '~/hooks'
import { handleStringParam } from '~/libs/params.libs'
import { router } from '~/main'
import { deleteDepartmentAction, getAllDepartmentAction } from '~/stores/department/departmentSlice'
import { useAppDispatch, useAppSelector } from '~/stores/hook'

const DepartmentTable = () => {
  const { departments, isDeleted, isLoading } = useAppSelector((state) => state.department)
  const [searchParams] = useSearchParams()
  const { page, size } = usePagination()

  const q = searchParams.get('q')
  const dispatch = useAppDispatch()

  const renderTable = () => {
    if (isLoading) {
      return <SkeletonTable col={4} />
    }
    if (!departments.length) {
      return <NotFoundTable />
    }
    return departments.map((department, index) => {
      return (
        <tr key={index} className='border-t hover:bg-zinc-50 transition-colors border-zinc-200 text-sm text-zinc-900'>
          <td className='px-4 py-2'>
            <span className='border py-1 px-2 rounded-md font-semibold'>{department?.name}</span>
          </td>
          <td className='px-4 py-2 text-center'>{department?.projects?.length}</td>

          <td className='px-4 py-2'>
            <div className='flex -space-x-4 rtl:space-x-reverse'>
              {department.employees.slice(0, 3).map((employee, key) => {
                return (
                  <div
                    key={key}
                    className='flex items-center justify-center w-10 h-10 text-xs font-medium z-10 border-2 border-white text-black bg-gray-100 rounded-full'
                  >
                    {`${employee.last_name.charAt(0)}${employee.first_name.charAt(0)}`}
                  </div>
                )
              })}

              <div className='flex items-center justify-center w-10 h-10 z-10 text-xs font-semibold text-white bg-gray-800 border-white  rounded-full'>
                {department?.employees?.length ? `+ ${department?.employees?.length - 3}` : `0`}
              </div>
            </div>
          </td>
          <td className='px-4 py-2'>
            <TableAction
              handleDeleteEvent={() => {
                dispatch(deleteDepartmentAction({ id: department._id }))
              }}
              handleEditEvent={() => {
                router.navigate(`${location.pathname}/${department._id}`)
              }}
            />
          </td>
        </tr>
      )
    })
  }

  useEffect(() => {
    dispatch(getAllDepartmentAction({ page: `${page}`, q: handleStringParam(q), size: `${size}` }))
  }, [dispatch, page, q, size, isDeleted])

  return (
    <>
      <h3 className='font-bold text-2xl pb-4'>Department</h3>
      <div className='bg-white px-6 pb-8 rounded-lg shadow'>
        <div className='flex items-center justify-between flex-wrap pt-6 pb-4 gap-3'>
          <InputSearch placeholder='Filter name...' />
          <Button
            className='bg-black text-white font-semibold hover:opacity-80 transition-all'
            onClick={() => router.navigate(`${location.pathname}/add`)}
          >
            <MdAddCircleOutline className='text-white mr-2 text-lg' />
            Add department
          </Button>
        </div>
        <div className='relative overflow-x-auto border border-zinc-200 rounded-lg mb-4'>
          <Table>
            <thead>
              <tr className=' transition-all bg-zinc-100 text-black'>
                {DEPARTMENT_FILED_HEADINGS.map((heading, index) => {
                  return (
                    <th className={`px-4 py-2 capitalize font-semibold ${heading.center && 'text-center'}`} key={index}>
                      {heading.title}
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>{renderTable()}</tbody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default DepartmentTable
