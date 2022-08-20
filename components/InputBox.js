import React from 'react'

import Image from 'next/image'
import { useSession } from 'next-auth/react'

import { EmojiHappyIcon } from '@heroicons/react/solid';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';



function InputBox() {
    
    const { data: session, loading } = useSession();
    
    const sendPost = (e) => {

        e.preventDefault();
        
    }
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
                            flex-grow px-5 focus:outline-none' 
                    type="text" 
                    placeholder={`What's on your mind, ${session.user.name}?`} />
            
                <button 
                    hidden
                    type="submit"
                    onClick={() => sendPost()}
                    className='rounded-full'>
                    Submit            
                </button>
                
                
            </form>

        </div>

        <div className='flex space-x-4 p-2 items-centers border-t'>
            
            <div className='inputIcon'>
                <VideoCameraIcon className='sm:h-6 h-7 rounded-full text-red-600'/>
                <p className='sm:text-sm xl:text-base'>Live Video</p>
            </div>
            
            <div className='inputIcon'>
                <CameraIcon className='sm:h-6 h-7 rounded-full text-green-700'/>
                <p className='sm:text-sm xl:text-base'>Photo/Video</p>
            </div>
            
            <div className='inputIcon'>
                <EmojiHappyIcon className='sm:h-6 h-7 rounded-full text-yellow-600'/>
                <p className='sm:text-sm xl:text-base'>Feeling/Acivity</p>
            </div>
            
        </div>


        
    </div>
  )
}

export default InputBox