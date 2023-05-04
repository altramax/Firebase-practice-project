// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBl6LbTP0VtK1L_rH971oQn-qvM7OJ8GTw",
  authDomain: "fir-course-445b9.firebaseapp.com",
  projectId: "fir-course-445b9",
  storageBucket: "fir-course-445b9.appspot.com",
  messagingSenderId: "242399488545",
  appId: "1:242399488545:web:ed363eca88f2138922d160",
  measurementId: "G-QN0P27PV5P"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
