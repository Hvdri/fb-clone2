import React from 'react'

import Image from 'next/image'

import HeaderIcon from './HeaderIcon';

import {
  HomeIcon, UserGroupIcon, ViewGridIcon, BellIcon, ChatIcon, ChevronDownIcon,
} from '@heroicons/react/solid';

import {
  SearchIcon, FlagIcon, PlayIcon, ShoppingCartIcon,
} from '@heroicons/react/outline';

function Header() {
  return (
    <div className='sticky top-0 z-50 bg-white flex items-center p-2 lg:pg-5 shadow-md'>
        {/* LEFT */}

        <div className='flex items-center'>
          <Image 
              src = '/images/fbicon.jpg'
              width={40}
              height={40}
              layout="fixed"
              alt="logo" 
          />

          

            <div className='flex nl-2 items-center rounded-full bg-gray-100 p-2'>
              <SearchIcon className='h-6 text-gray-600'/>
              <input className='hidden md:inline-flex nl-2 items-center bg-transparent 
              outline-none placeholder-gray-500 flex-shrink' 
              type="text" 
              placeholder="Search" />
            </div>

          </div>

          {/* CENTER */}

          <div className='flex justify-center flex-grow'>

            <div className='flex space-x-6 md:space-x-2'>

              <HeaderIcon Icon={HomeIcon} active />
              <HeaderIcon Icon={FlagIcon} />
              <HeaderIcon Icon={PlayIcon} />
              <HeaderIcon Icon={ShoppingCartIcon} />
              <HeaderIcon Icon={UserGroupIcon} />

            </div>
          </div>

          {/* RIGHT */}
          <div className='flex items-center sm:space-x-2 justify-end '>

            <p className='whitespace-nowrap font-semibold pr-3'>USERNAME</p>
            <ViewGridIcon className="icon" />
            <ChatIcon className="icon" />
            <BellIcon className="icon" />
            <ChevronDownIcon className="icon" />

          </div>

    </div>
  )
}

export default Header