import React from 'react'

import Image from 'next/image'
import { useSession } from 'next-auth/react'


function InputBox() {
  
  const { data: session, loading } = useSession();
  return (



    <div className='bg-white p-2 rounded-2xl 
                    shadow-md text-gray-500
                    font-medium mt-6'>
        
        <div className='flex space-x-4 p-2 items-centers'>
            {/* IMG + INPUT */}
            <Image 
                className= "rounded-full"
                src = {session.user.image}
                width={40}
                height={40}
                layout="fixed"
            />

            <form className='flex flex-1'>
                <input 
                    className='rounded-full h-auto bg-gray-100
                            flex-grow px-5 focus:utline-none' 
                    type="text" 
                    placeholder={`What's on your mind, ${session.user.name}?`} />
            
                <button 
                    // hidden
                    type="submit"
                    onClick={() => sendPost()}
                    className='rounded-full'>
                    Submit            
                </button>
                
                
            </form>

        </div>

        <div>
            {/* LIVE + VIDEO/PIC + STATUS */}
        </div>


        
    </div>
  )
}

export default InputBox