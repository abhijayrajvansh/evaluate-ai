import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MoveLeft } from 'lucide-react'

const Signup = () => {
  return (
    <div className="container mx-auto w-full h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="font-serif text-5xl">Sign Up</p>
        <Button asChild variant={'link'} className="mt-7 text-lg">
          <Link href={"/"}><MoveLeft />return back</Link>
        </Button>
      </div>
    </div>
  )
}

export default Signup