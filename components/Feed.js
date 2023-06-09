import React from 'react'

import Stories from '../components/Stories'
import InputBox from '../components/InputBox'
import Posts from '../components/Posts'

function Feed() {
  return (
    <div className='pb-44 pt-6
                    xl:mr-40 overflow-y-auto 
                    lg:pg-5 flex flex-1 pr-20 p-5'>
        <div className='mx-auto max-w-md md:max-w-lg
                    lg:max-w-2xl'>
            <Stories />
            <InputBox />
            <Posts />
        </div>

    </div>
  )
}

export default Feed