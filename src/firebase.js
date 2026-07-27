import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCaRl6Qr4l3NYDILjLJktsKGWSIysxcmig",
  authDomain: "wasteless-5ef7e.firebaseapp.com",
  projectId: "wasteless-5ef7e",
  storageBucket: "wasteless-5ef7e.firebasestorage.app",
  messagingSenderId: "480141163670",
  appId: "1:480141163670:web:79d581c40fb529027116b7",
  measurementId: "G-GLC0E615K6"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)