import { HalfDoughnutChart } from '..'

const LoadingBigCard = () => {
  return (
    <div className='bg-white w-full mt-4 px-6 py-4 rounded-md'>
      <div className='animate-pulse'>
        <h3 className='h-5 w-44 bg-gray-200 text-xl font-bold mb-10 rounded-md'></h3>
        <div className='relative'>
          <HalfDoughnutChart data={[0, 0]} />
          <div className='absolute h-full w-full bg-gray-200 top-0 rounded-md'></div>
        </div>
        <div className='relative'>
          <p className='font-semibold w-96 my-4 bg-gray-200 h-5 rounded-md text-sm mx-auto'></p>
        </div>
      </div>
    </div>
  )
}

export default LoadingBigCard
