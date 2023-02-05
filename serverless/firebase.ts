import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = { 
  apiKey: "AIzaSyDYDZqTPkl83Of0jYBXcjppz-scHJD6DAM",
  authDomain: "nashe-6fd0f.firebaseapp.com",
  projectId: "nashe-6fd0f",
  storageBucket: "nashe-6fd0f.appspot.com",
  messagingSenderId: "1009663622847",
  appId: "1:1009663622847:web:69a54907dd85925008900a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// services
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

const provider = new GoogleAuthProvider()

export { auth, db, provider, storage }