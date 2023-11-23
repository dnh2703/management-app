import { FaUserTie } from 'react-icons/fa6'
import { LoadingSmallCard } from '~/components'
import { ICustomer } from '~/types/customer.types'
import { findMostFrequentElement } from '~/utils/element'

interface TotalCustomersProps {
  isLoading: boolean
  customers: ICustomer[]
}

const TotalCustomers = ({ customers, isLoading }: TotalCustomersProps) => {
  const ListCountry = customers.map((customer) => customer.country)

  if (isLoading) {
    return <LoadingSmallCard />
  }

  return (
    <div className='col-span-2 bg-white rounded-md h-48 px-6 py-4'>
      <div className='flex flex-col items-center'>
        <div className='h-8 w-8 flex justify-center text-sm items-center rounded-full bg-teal-200 text-teal-600'>
          <FaUserTie />
        </div>
        <h3 className='font-bold text-4xl pt-2'>{customers?.length}</h3>
        <p className='text-zinc-600 text-sm font-medium'>Total customers</p>
        <p className='text-teal-600 text-sm pt-6 font-bold'>
          {((findMostFrequentElement(ListCountry)?.times / ListCountry?.length) * 100).toFixed(2)}%{' '}
          {findMostFrequentElement(ListCountry)?.name}
        </p>
      </div>
    </div>
  )
}

export default TotalCustomers
