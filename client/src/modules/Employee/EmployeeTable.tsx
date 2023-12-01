import { useEffect } from 'react'
import { MdAddCircleOutline } from 'react-icons/md'
import { useSearchParams } from 'react-router-dom'
import { Button, InputSearch, NotFoundTable, Pagination, Table, TableAction } from '~/components'
import SkeletonTable from '~/components/SkeletonTable'
import { EMPLOYEE_FILED_HEADINGS } from '~/constants/thead.constants'
import { usePagination } from '~/hooks'
import { handleStringParam } from '~/libs/params.libs'
import { router } from '~/main'
import { deleteEmployeeAction, getAllEmployeeAction } from '~/stores/employee/employeeSlice'
import { useAppDispatch, useAppSelector } from '~/stores/hook'

const EmployeeTable = () => {
  const { employees, totalPage, isLoading, isDeleted } = useAppSelector((state) => state.employee)
  const [searchParams] = useSearchParams()
  const { page, size } = usePagination()

  const q = searchParams.get('q')
  const dispatch = useAppDispatch()

  const renderTable = () => {
    if (isLoading) {
      return <SkeletonTable />
    }
    if (!employees.length) {
      return <NotFoundTable />
    }
    return employees.map((employee, index) => {
      return (
        <tr key={index} className='hover:bg-zinc-50 transition-colors border-t border-zinc-200 text-sm text-zinc-900'>
          <td className='px-4 py-2 whitespace-nowrap'>
            {employee.department && (
              <span className='border text-center py-1 inline-flex w-12 justify-center rounded-md font-semibold mr-2'>
                {employee.department?.name}
              </span>
            )}
            {employee.full_name}
          </td>

          <td className='px-4 py-2'>{employee.experience}</td>
          <td className='px-4 py-2'>
            {employee.projects.filter((project) => project.status == 'in progress').length
              ? `Occupied (${employee.projects.filter((project) => project.status == 'in progress').length})`
              : 'Free'}
          </td>
          <td className='px-4 py-2'>{employee.tech_stacks.map((employee) => employee.name)}</td>
          <td className='px-4 py-2'>
            <TableAction
              handleDeleteEvent={() => {
                dispatch(deleteEmployeeAction({ id: employee.employee_id }))
              }}
              handleEditEvent={() => {
                router.navigate(`${location.pathname}/${employee.employee_id}`)
              }}
            />
          </td>
        </tr>
      )
    })
  }

  useEffect(() => {
    dispatch(getAllEmployeeAction({ page: `${page}`, q: handleStringParam(q), size: `${size}` }))
  }, [dispatch, page, q, size, isDeleted])

  return (
    <>
      <h3 className='font-bold text-2xl pb-4'>Employee</h3>
      <div className='bg-white px-6 pb-8 rounded-lg shadow'>
        <div className='flex items-center justify-between flex-wrap pt-6 pb-4 gap-3'>
          <InputSearch placeholder='Filter name...' />
          <Button
            className='bg-black text-white font-semibold hover:opacity-80 transition-all'
            onClick={() => router.navigate(`${location.pathname}/add`)}
          >
            <MdAddCircleOutline className='text-white mr-2 text-lg' />
            Add employee
          </Button>
        </div>
        <div className='relative overflow-x-auto border border-zinc-200 rounded-lg mb-4'>
          <Table>
            <thead>
              <tr className=' transition-all bg-zinc-100 text-black'>
                {EMPLOYEE_FILED_HEADINGS.map((heading, index) => {
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
        <Pagination totalPage={totalPage} size={size} page={page} />
      </div>
    </>
  )
}

export default EmployeeTable
