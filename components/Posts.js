import React from 'react'

import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import Post from '../components/Post';

import { query, orderBy, collection } from 'firebase/firestore';

function Posts() {

    const [realtimePosts, loading, error] = useCollection(
      query(
        collection(db, 'posts'), orderBy('timestamp', 'desc')
      )
    );

  return (
    <div>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
        {realtimePosts?.docs.map((post) => (
            <Post 
                key = {post.id}
                name = {post.data().name}
                message = {post.data().message}
                email = {post.data().email}
                postImage = {post.data().postImage}
                image = {post.data().image}
                timestamp = {post.data().timestamp}
                currentDateTime = {post.data().currentDateTime}
            />
        ))}
    </div>
  )
}

export default Posts
