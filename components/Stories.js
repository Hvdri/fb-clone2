import React from 'react'

import StoryCard from '../components/StoryCard'

const stories = [
    {
        name: 'Horia1',
        src: '/images/fb-photo-sizes-story-infographic.webp',
        profile: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    },
    {
        name: 'Horia2',
        src: '/images/fb-photo-sizes-story-infographic.webp',
        profile: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    },
    {
        name: 'Horia3',
        src: '/images/fb-photo-sizes-story-infographic.webp',
        profile: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    },
    {
        name: 'Horia4',
        src: '/images/fb-photo-sizes-story-infographic.webp',
        profile: '/images/index.jpg',
    },
    {
        name: 'Horia5',
        src: '/images/fb-photo-sizes-story-infographic.webp',
        profile: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    },
]

function Stories() {
  return (
    
    <div className='flex justify-center space-x-3 mx-auto'>

        {stories.map(story => (
            <StoryCard
                key={story.src}
                name={story.name}
                src={story.src}
                profile={story.profile}
            />
        ))}
    </div>
  )
}

export default Stories