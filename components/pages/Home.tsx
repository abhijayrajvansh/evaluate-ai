import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <section>
      <h1 className='text-2xl mb-5'>Home</h1>
      <Link href={'/dashboard'} className='text-blue-500 underline underline-offset-4'>goto dashboard</Link>
    </section>
  )
}

export default Home