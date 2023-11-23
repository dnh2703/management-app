const InternalServerPage = () => {
  return (
    <section className=''>
      <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <h1 className='mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-red-600 '>500</h1>
          <p className='mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl '>Internal Server Error.</p>
          <p className='mb-4 text-lg font-light text-gray-500'>We are already working to solve the problem.</p>
        </div>
      </div>
    </section>
  )
}

export default InternalServerPage
