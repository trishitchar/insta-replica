// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FireBase_API,
  authDomain: "insta-next-1.firebaseapp.com",
  projectId: "insta-next-1",
  storageBucket: "insta-next-1.appspot.com",
  messagingSenderId: "129051384617",
  appId: "1:129051384617:web:ba1af2b2dc83bbe1033538"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
