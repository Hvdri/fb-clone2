import React from 'react'

function HeaderIcon( { Icon, active } ) {
  return (
    <div className='group flex items-center cursor-pointer
     hover:bg-gray-100 rounded-xl md:px-10 md:h-12 
      active:border-b-2 active:border-blue-500' >
        
        <Icon 
        className={`text-gray-500 text-center h-5 group-hover:text-blue-500 
        sm:h-7 md-auto ${active && "text-blue-500"}`} />
    
    </div>
  )
}

export default HeaderIcon