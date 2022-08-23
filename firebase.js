// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { getFirestore, doc, setDoc, collection, Firestore, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzMrP2mN70dajNBrwfSG5C-0W4ALqhyBs",
  authDomain: "facebook-clone-1822e.firebaseapp.com",
  projectId: "facebook-clone-1822e",
  storageBucket: "facebook-clone-1822e.appspot.com",
  messagingSenderId: "1058924900550",
  appId: "1:1058924900550:web:e47633d02906d6c65c27c7",
  measurementId: "G-1RDWRT6XXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Services 

const db = getFirestore(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app)
// export { db, storage };

//           colectie / document
const insertFeed = doc(db, 'feed/feed');

//new Collection:
const newCollection = collection(db, 'posts');

export { db, insertFeed, app, newCollection, storage }; 
