const LoadingSmallCard = () => {
  return (
    <div className='col-span-2 bg-white rounded-md h-48 px-6 py-4'>
      <div className='flex flex-col items-center  animate-pulse'>
        <div className='h-8 w-8 flex justify-center text-sm items-center rounded-full bg-gray-200'></div>
        <h3 className='bg-gray-200 font-bold h-9 w-10 mb-2 text-4xl mt-2 rounded-md'></h3>
        <p className='bg-gray-200 text-sm font-medium w-24 h-4 rounded-md'></p>
        <p className='bg-gray-200 text-sm w-20 h-4 mt-8 font-bold rounded-md'></p>
      </div>
    </div>
  )
}

export default LoadingSmallCard
