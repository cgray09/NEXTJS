// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "next-estate-b7472.firebaseapp.com",
  projectId: "next-estate-b7472",
  storageBucket: "next-estate-b7472.firebasestorage.app",
  messagingSenderId: "422664496580",
  appId: "1:422664496580:web:ecc97faff1b2a734acf091"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);