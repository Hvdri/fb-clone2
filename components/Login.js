import React from 'react'

import Image from 'next/image'

import { useSession, signIn, signOut } from "next-auth/react"

function Login() {
  return (
    <div className='mt-20 grid place-items-center'>

        <Image
            src = '/images/fbicon.jpg'
            width={150}
            height={150}
            objectFit="contain"
            alt="logo"

        />
        <h1 
            onClick={() => signIn()}
            className='mt-20 p-5 bg-blue-500 rounded-full
             text-white text-center cursor-pointer'>
            Login With Facebook
        </h1>

    </div>
  )
}

export default Login