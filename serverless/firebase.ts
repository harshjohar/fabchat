import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDrjbIjCNL3yaS2jWndpPcoG6SDxtkSy9c",
  authDomain: "fabchat-9e526.firebaseapp.com",
  projectId: "fabchat-9e526",
  storageBucket: "fabchat-9e526.appspot.com",
  messagingSenderId: "270106605678",
  appId: "1:270106605678:web:36b20acfc54e9a3c678e7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()
const provider = new GoogleAuthProvider()
const storage = getStorage()

export { auth, db, provider, storage }