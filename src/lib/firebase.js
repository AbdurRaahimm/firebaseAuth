
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//  Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "react-authentication-75bab.firebaseapp.com",
  projectId: "react-authentication-75bab",
  storageBucket: "react-authentication-75bab.appspot.com",
  messagingSenderId: "80262195968",
  appId: "1:80262195968:web:7c87df13e2d345376e21e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);

// Firebase Firestore
const db = getFirestore(app);

export { auth, db };
