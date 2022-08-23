import React, { useRef, useState } from 'react'

import Image from 'next/image'
import { useSession } from 'next-auth/react'

import { EmojiHappyIcon } from '@heroicons/react/solid';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';


// IMPORTS FOR FIREBASE
import { db, insertFeed, newCollection, storage } from '../firebase';
import { getFirestore, doc, setDoc, addDoc } from "firebase/firestore";


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


function InputBox() {
    
    const { data: session, loading } = useSession();
    
    const inputRef = useRef(null);
    const filepickerRef = useRef(null);
    const [ImageToPost, setImageToPost] = useState(null);

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
              //add a timestamp to the document
              timestamp: new Date().getTime(),
              currentDateTime: Date().toLocaleString(),
              //add the current time day/month/year to the document

            }).then( doc => {
                if(ImageToPost){
                    const uploadTask = storage.ref(`posts/${doc.id}`)
                                        .putString(ImageToPost,'data_url');
                    removeImage();

                    uploadTask.on(
                        'state_change', 
                        null, 
                        (error) => console.error(error),
                    () => {
                        // Upload Completed successfully
                        storage.ref('posts').child(doc.id).getDownloadURL().then(url => {
                            db.collection('posts').doc(doc.id).set({
                                postImage: url,
                            },
                                { merge: true } 
                            )
                        })
                    }
                );
            }
            });
          }
        addNewDocument();
        console.log('here!');
        inputRef.current.value = '';
    };

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        };

        reader.onload = (readerEvent) => {
            setImageToPost(readerEvent.target.result);
        };
    };

    const removeImage = () => {
        setImageToPost(null);
    };

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
                
                {ImageToPost && (
                    <div 
                    onClick={removeImage} 
                    className='flex flex-col filter hover:brightness-110
                               transition duration-150 transform hover:scale-105
                               cursor-pointer h-12'>
                        <img 
                        src={ImageToPost} alt="" 
                        className='h-12 object-contain rounded-md'
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
                    onChange={addImageToPost}
                    ref={filepickerRef}
                />
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