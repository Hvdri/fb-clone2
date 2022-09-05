import Image from 'next/image'
import React from 'react'

function Post({ name, message, email, postImage, image, timestamp }) {
  
// Mapping the images TEST
// const imageListRef = ref(storage, 'images/');
// useEffect(() => {
    
//     listAll(imageListRef).then((response) => {
//         response.items.forEach((item) => {
//             getDownloadURL(item).then((downloadURL) => {
//                 setImageList((prev) => [...prev, downloadURL]);
//             });
//         })
//     });
// }, []);

   return (
    <div className='flex flex-col'>
        <div className='p-5 bg-white mt-5 rounded-t-2xl shadow-sm'>
          <div className='flex items-center space-x-2'>
            <img className='rounded-full'
              src={image} 
              width={40} 
              height={40} 
              alt={`${name}' post, Error loading image`} 
            />
          <div>
            <p className='font-medium'>
              {name}
            </p>

            <p className='text-xs text-gray-400'>
              {new Date(timestamp)?.toDateString()}
            </p>
          </div>

        </div>

        <p className='pt-4'>{message}</p>
      </div>
      {postImage && (
        <div className='relative h-56 md:h-96 bg-white'>
          <img className='h-full w-full'
            src={postImage}
          />
        </div>
      )}

    </div>
  )
}

export default Post