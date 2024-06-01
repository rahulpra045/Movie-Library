// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBiz-AeLHndqKY0hVmZ6xa26h1u4g7JDc",
  authDomain: "movie-library-d9c36.firebaseapp.com",
  projectId: "movie-library-d9c36",
  storageBucket: "movie-library-d9c36.appspot.com",
  messagingSenderId: "269172623918",
  appId: "1:269172623918:web:0a7ac26f0fbbc322672dbf",
  measurementId: "G-T8CMRR5PYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth };