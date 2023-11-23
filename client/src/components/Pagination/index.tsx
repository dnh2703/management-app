import { memo } from 'react'
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft
} from 'react-icons/md'
import { Button, SingleSelect } from '..'
import { useSearchParams } from 'react-router-dom'
import { SIZE_PAGE } from '~/constants/pagination.constants'

interface PaginationProps {
  totalPage: number
  size: number
  page: number
}

const Pagination = memo(({ totalPage, size, page }: PaginationProps) => {
  const [, setSearchParams] = useSearchParams()

  const currentPage = page

  const handleFirstPage = () => {
    if (currentPage > 0) {
      setSearchParams((prev) => {
        prev.set('page', `0`)
        return prev
      })
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPage - 1) {
      setSearchParams((prev) => {
        prev.set('page', `${currentPage + 1}`)
        return prev
      })
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setSearchParams((prev) => {
        prev.set('page', `${currentPage - 1}`)
        return prev
      })
    }
  }

  const handleLastPage = () => {
    if (currentPage < totalPage - 1) {
      setSearchParams((prev) => {
        prev.set('page', `${totalPage - 1}`)
        return prev
      })
    }
  }

  const handleSizePage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (['5', '10', '15', '20'].includes(e.target.value)) {
      setSearchParams((prev) => {
        prev.set('page', '0')
        prev.set('size', e.target.value)
        return prev
      })
    }
  }

  return (
    <nav
      className='flex flex-col mt-2 items-start justify-between lg:items-center gap-3 lg:flex-row'
      aria-label='Table navigation'
    >
      <div className='flex items-center'>
        <label htmlFor='countries' className='block text-xs font-medium text-gray-900 whitespace-nowrap'>
          Rows per page
        </label>
        <SingleSelect
          id='countries'
          className='bg-gray-50 border ml-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-zinc-500 focus:border-zinc-500 block w-full'
          onChange={(e) => handleSizePage(e)}
          defaultValue={size}
          options={SIZE_PAGE}
        />
        <div className='flex-nowrap flex text-xs gap-[3px] font-medium ml-4'>
          <span>Page</span>
          <span className='font-bold'>{currentPage + 1}</span>
          <span>of</span>
          <span className='font-bold'>{totalPage}</span>
        </div>
      </div>
      <div className='flex gap-2'>
        <Button
          type='button'
          className='text-zinc-700 hover:bg-zinc-100 transition-all disabled:cursor-default disabled:text-zin-100 disabled:hover:bg-white'
          onClick={handleFirstPage}
          disabled={currentPage <= 0}
        >
          <MdKeyboardDoubleArrowLeft className='w-5 h-5' />
        </Button>
        <Button
          type='button'
          className='text-zinc-700 hover:bg-zinc-000 transition-all disabled:cursor-default disabled:text-zin-100 disabled:hover:bg-white'
          onClick={handlePreviousPage}
          disabled={currentPage <= 0}
        >
          <MdKeyboardArrowLeft className='w-5 h-5' />
        </Button>
        <Button
          type='button'
          className='text-zinc-700 hover:bg-zinc-100 transition-all disabled:cursor-default disabled:text-zin-100 disabled:hover:bg-white'
          onClick={handleNextPage}
          disabled={currentPage >= totalPage - 1}
        >
          <MdKeyboardArrowRight className='w-5 h-5' />
        </Button>
        <Button
          type='button'
          className='text-zinc-700 hover:bg-zinc-100 transition-all disabled:cursor-default disabled:text-zin-100 disabled:hover:bg-white'
          onClick={handleLastPage}
          disabled={currentPage >= totalPage - 1}
        >
          <MdKeyboardDoubleArrowRight className='w-5 h-5' />
        </Button>
      </div>
    </nav>
  )
})

export default Pagination
