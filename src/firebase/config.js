import { initializeApp } from 'firebase/app'
import { getFirestore, serverTimestamp } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`
};

// Initialize Firebase
initializeApp(firebaseConfig)

// init firestore
const db = getFirestore()
const fbTimestamp = serverTimestamp()

// init firebase auth
const auth = getAuth()
const googleAuth = new GoogleAuthProvider()

// init firebase storage
const storage = getStorage()

export { db, auth, fbTimestamp, googleAuth, storage }
