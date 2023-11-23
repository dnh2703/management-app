import { memo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BsSearch } from 'react-icons/bs'
import { Input } from '..'
import { InputProps } from '../Input'

const InputSearch = memo(({ placeholder, className }: InputProps) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const { register, handleSubmit, setValue } = useForm<{ q: string }>()

  useEffect(() => {
    const q = searchParams.get('q')

    if (q) {
      setValue('q', q)
    }
  }, [])

  const onSubmit: SubmitHandler<{ q: string }> = (data) => {
    setSearchParams((prev) => {
      prev.set('page', '0')
      prev.set('q', data.q)
      return prev
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`relative ${className}`}>
      <div className='absolute top-1/2 -translate-y-1/2 left-3 text-zinc-200'>
        <BsSearch />
      </div>
      <Input
        type='text'
        {...register('q')}
        className='pl-10 text-sm border border-zinc-200 placeholder:text-zinc-300 w-full'
        placeholder={placeholder}
      />
    </form>
  )
})

export default InputSearch
