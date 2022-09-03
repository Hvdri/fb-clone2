import React from 'react'



function Post() {
  
// Mapping the images TEST
const imageListRef = ref(storage, 'images/');
useEffect(() => {
    
    listAll(imageListRef).then((response) => {
        response.items.forEach((item) => {
            getDownloadURL(item).then((downloadURL) => {
                setImageList((prev) => [...prev, downloadURL]);
            });
        })
    });
}, []);



   return (
    <div>
        
    </div>
  )
}

export default Post