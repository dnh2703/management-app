import { useEffect } from 'react'
import { MdAddCircleOutline } from 'react-icons/md'
import { useSearchParams } from 'react-router-dom'
import { Button, InputSearch, NotFoundTable, Pagination, Table, TableAction } from '~/components'
import SkeletonTable from '~/components/SkeletonTable'
import { CUSTOMER_FILED_HEADINGS } from '~/constants/thead.constants'
import { usePagination } from '~/hooks'
import { handleStringParam } from '~/libs/params.libs'
import { router } from '~/main'
import { deleteCustomerAction, getAllCustomerAction } from '~/stores/customer/customerSlice'
import { useAppDispatch, useAppSelector } from '~/stores/hook'

const CustomerTable = () => {
  const { customers, totalPage, isLoading, isDeleted } = useAppSelector((state) => state.customer)
  const [searchParams] = useSearchParams()
  const { page, size } = usePagination()

  const q = searchParams.get('q')
  const dispatch = useAppDispatch()

  const renderTable = () => {
    if (isLoading) {
      return <SkeletonTable col={6} />
    }
    if (!customers.length) {
      return <NotFoundTable />
    }
    return customers.map((customer, index) => {
      return (
        <tr key={index} className='border-t border-zinc-200 text-sm hover:bg-zinc-50 transition-colors text-zinc-900'>
          <td className='px-4 py-2 whitespace-nowrap'>{customer.name}</td>
          <td className='px-4 py-2 whitespace-nowrap'>{customer.company}</td>
          <td className='px-4 py-2 whitespace-nowrap'>{customer.country}</td>
          <td className='px-4 py-2'>
            <span
              className={`px-4 py-1 capitalize whitespace-nowrap rounded-full text-center font-medium ${
                customer.status == 'active' ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'
              }`}
            >
              {customer.status}
            </span>
          </td>
          <td className='px-4 py-2 capitalize whitespace-nowrap'>{customer.priority}</td>
          <td className='px-4 py-2'>
            <TableAction
              handleDeleteEvent={() => {
                dispatch(deleteCustomerAction({ id: customer._id }))
              }}
              handleEditEvent={() => {
                router.navigate(`${location.pathname}/${customer._id}`)
              }}
            />
          </td>
        </tr>
      )
    })
  }

  useEffect(() => {
    dispatch(getAllCustomerAction({ page: `${page}`, q: handleStringParam(q), size: `${size}` }))
  }, [dispatch, page, q, size, isDeleted])

  return (
    <>
      <h3 className='font-bold text-2xl pb-4'>Customer</h3>
      <div className='bg-white px-6 pb-8 rounded-lg shadow'>
        <div className='flex items-center justify-between flex-wrap pt-6 pb-4 gap-3'>
          <InputSearch placeholder='Filter name...' />
          <Button
            className='bg-black text-white font-semibold hover:opacity-80 transition-all'
            onClick={() => router.navigate(`${location.pathname}/add`)}
          >
            <MdAddCircleOutline className='text-white mr-2 text-lg' />
            Add customer
          </Button>
        </div>
        <div className='relative overflow-x-auto border border-zinc-200 rounded-lg mb-4'>
          <Table>
            <thead>
              <tr className=' transition-all bg-zinc-100 text-black'>
                {CUSTOMER_FILED_HEADINGS.map((heading, index) => {
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
        <Pagination totalPage={totalPage} page={page} size={size} />
      </div>
    </>
  )
}

export default CustomerTable
