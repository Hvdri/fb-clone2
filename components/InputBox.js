import React, { useRef, useState, useEffect } from 'react'

import Image from 'next/image'
import { useSession } from 'next-auth/react'

import { EmojiHappyIcon } from '@heroicons/react/solid';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';


// IMPORTS FOR FIREBASE
import { db, insertFeed, newCollection, storage } from '../firebase';
import { getFirestore, doc, setDoc, addDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';

// Randomizer for the name of the images
import { v4 } from 'uuid';

function prenume( str ) {
    return str.split(" ")[0];
}  

// function addToCollectionDocument(inputRef){
//     const docData = {
//         message: {inputRef}.current.value,
//         name: session.user.name,
//         email: session.user.email,
//         image: session.user.image,
//     };

//     setDoc(insertFeed, docData);
// }

const imageMimeType = /image\/(png|jpg|jpeg)/i;

function InputBox() {
    
    const { data: session, loading } = useSession();
    
    const inputRef = useRef(null);
    const filepickerRef = useRef(null);

    const [ImageToPost, setImageToPost] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);
    const [ImageList, setImageList] = useState([]);

    //send post function to the db via firestore
    const sendPost = (e) => {
        e.preventDefault();
        
        if(!inputRef.current.value) return;

        async function addNewDocument() {
            const newDoc = await addDoc(newCollection, {
              message: inputRef.current.value,
              name: session.user.name,
              email: session.user.email,
              image: session.user.image,
              timestamp: new Date().getTime(),
              currentDateTime: Date().toLocaleString(),
              postImage: '',

            }).then((newDoc) => {
                
                // Check if there is an image selected
                if(ImageToPost == null) return;
                
                // Create a reference
                const nameOfTheImage = ImageToPost.name + v4();
                const imageRef = ref(storage, `images/${nameOfTheImage}`);

                const uploadTaskRef = doc(db, 'posts', `${newDoc.id}`)
                
                // Upload the image to the storage
                uploadBytes(imageRef, ImageToPost).then(() => {                    
                    getDownloadURL(imageRef).then((url) => {
                        
                        setDoc(uploadTaskRef, {
                            postImage: url,
                        }, { merge: true })

                    }).catch((error) => {
                        alert(error.message);
                    });
                    alert(`Image uploaded successfully`);
                }, { merge: true })
                

                // Get the downloadable url for the image

                // Remove the image preview
                removeImage();
            })
        };
                
        addNewDocument();
        console.log('here!');
        inputRef.current.value = '';
    };

    const removeImage = () => {
        setFileDataURL(null);
    };
    
    // Updates the current image
    const changeHandler = (e) => {
        const file = e.target.files[0];
        if (!file.type.match(imageMimeType)) {
          alert("Image mime type is not valid");
          return;
        }
        setImageToPost(file);
    }
    
    // Preview of the image
    useEffect(() => {
        let fileReader, isCancel = false;
        if (ImageToPost) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
            const { result } = e.target;
            if (result && !isCancel) {
              setFileDataURL(result)
            }
        }
          fileReader.readAsDataURL(ImageToPost);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }  
        }
        
    }, [ImageToPost]);
    
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
                    ref={inputRef}
                    className='rounded-full h-auto bg-gray-100
                    flex-grow px-5 focus:outline-none' 
                    type="text" 
                    placeholder={`What's on your mind, ${prenume(session.user.name)}?`} />
            
                <button 
                    hidden
                    type="submit"
                    onClick={sendPost}
                    className='rounded-full'>
                    Submit            
                </button>
                
                {fileDataURL && (
                    <div 
                    onClick={removeImage} 
                    className='flex flex-col filter hover:brightness-110
                               transition duration-150 transform hover:scale-105
                               cursor-pointer h-12'>
                        <img 
                        src={fileDataURL} alt="" 
                        className='h-12 bject-contain rounded-md'
                        />
                        {/* A black drop appears shh idk why doesn't matter */}
                        {/* <p className='text-h-0 p-0 text-red-500 text-center'>Remove</p>' */}
                    
                    </div>
                )}

            </form>

        </div>

        <div className='flex space-x-4 p-2 items-centers border-t'>
            
            <div className='inputIcon'>
                <VideoCameraIcon className='sm:h-6 h-7 rounded-full text-red-600'/>
                <p className='sm:text-sm xl:text-base'>Live Video</p>
            </div>
            
            <div
            onClick={ () => filepickerRef.current.click() } 
            className='inputIcon'>
                <CameraIcon className='sm:h-6 h-7 rounded-full text-green-700'/>
                <p className='sm:text-sm xl:text-base'>Photo/Video</p>
                <input 
                    hidden
                    type='file'
                    id='image'
                    // accept="image/*"
                    onChange={changeHandler}
                    ref={filepickerRef}
                />
            </div>
            
            <div className='inputIcon'>
                <EmojiHappyIcon className='sm:h-6 h-7 rounded-full text-yellow-600'/>
                <p className='sm:text-sm xl:text-base'>Feeling/Acivity</p>
            </div>
            
        </div>

        {/* Test Imagini */}
        {ImageList.map((downloadURL) => {
            return <img src={downloadURL} alt='poza care nu merge' />
        })}
        
    </div>
  )
}

export default InputBox