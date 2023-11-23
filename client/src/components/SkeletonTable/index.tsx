interface SkeletonTableProps {
  row?: number
  col?: number
}

const SkeletonTable = ({ col = 5, row = 5 }: SkeletonTableProps) => {
  return [...Array(row)].map((_, key) => {
    return (
      <tr key={key} className='border-t border-zinc-200 animate-pulse text-zinc-900'>
        {[...Array(col)].map((_, index) => {
          return (
            <td key={index} className='px-4 py-2 text-sm '>
              <p className='bg-gray-200 rounded-full text-transparent'>Loading</p>
            </td>
          )
        })}
      </tr>
    )
  })
}

export default SkeletonTable
