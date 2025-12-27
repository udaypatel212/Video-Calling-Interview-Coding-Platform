import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';

import toast from 'react-hot-toast';
function HomePage() {
  return (
    <>
    <div>HomePage</div>
     <button className='btn btn-primary ' onClick={()=>toast.success("you clicked !!")} > this is button </button>
      <SignedOut>
        <SignInButton mode='modal' />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <UserButton/>
    </>
  )
}

export default HomePage