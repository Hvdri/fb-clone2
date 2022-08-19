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
                    // hidden
                    type="submit"
                    onClick={() => sendPost()}
                    className='rounded-full'>
                    Submit            
                </button>
                
                
            </form>

        </div>

        <div className='pl-11 flex space-x-4 p-2 items-centers'>
            
            <div className='flex flex-1'>
                <VideoCameraIcon className='h-7 rounded-full text-red-600'/>
                <p className='px-1 flex-grow '>Live Video</p>
            </div>
            
            <div className='flex flex-1'>
                <CameraIcon className='h-7 rounded-full text-green-700'/>
                <p className='px-1 flex-grow '>Photo/Video</p>
            </div>
            
            <div className='flex flex-1'>
                <EmojiHappyIcon className='h-7 rounded-full text-yellow-600'/>
                <p className='px-1 flex-grow '>Feeling/Acivity</p>
            </div>

        </div>


        
    </div>
  )
}

export default InputBox