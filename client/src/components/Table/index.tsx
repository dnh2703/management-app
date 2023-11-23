import clsx from 'clsx'
import React from 'react'

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

const Table = ({ children, className, ...props }: TableProps) => {
  return (
    <table className={clsx('w-full text-left text-gray-500', className)} {...props}>
      {children}
    </table>
  )
}

export default Table
