import React from 'react'

import Image from 'next/image'

function StoryCard( { name, src, profile } ) {
  return (
    
    <div className='relative h-12 w-12 sm-h-12
                    lg-h-56 lg:w-32 md:h-60 cursor-pointer overflow-hidden p-3
                    transition duration-200 transform ease-in
                    hover:scale-105 hover:animate-pulse'>
        <Image 
            className='absolute opacity-0 lg:opacity-100
                        rounded-full z-50 top-10'
            src = {profile}
            width={40}
            height={40}
            layout="fixed"
            objectFit="cover"
        />

        <Image 
            className='object-cover filter brightness-75
                        rounded-full lg:rounded-3xl'
            src = {src}
            layout="fill"
        />

        <p className='absolute pt-40 opacity-0 lg:opacity-100
                    botton-4 w-5/6 text-white text-sm
                    font-bold truncate'>
            {name}
        </p>


        
    </div>
  )
}

export default StoryCard