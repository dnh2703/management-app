import { useSearchParams } from 'react-router-dom'
import { handleNumberParam } from '~/libs/params.libs'

const usePagination = () => {
  const [searchParams] = useSearchParams()

  const page: number = handleNumberParam(searchParams.get('page')) || 1
  const size: number = handleNumberParam(searchParams.get('size')) || 5

  return { page, size }
}

export default usePagination
