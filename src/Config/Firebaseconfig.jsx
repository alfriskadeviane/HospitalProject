import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig ={
    apiKey: "AIzaSyBoFvevgNcIJYRCFqr0EBYgEZ5nUsjM_Zc",
    // databaseURL: "https://hospital-project-83059-default-rtdb.asia-southeast1.firebasedatabase.app",
    authDomain: "hospitalproject-83059.firebaseapp.com",
    projectId: "hospitalproject-83059",
    storageBucket: "hospitalproject-83059.firebasestorage.app",
    messagingSenderId: "555175416646",
    appId: "1:555175416646:web:048f8f82df52423bc58b47",
    measurementId: "G-XEJ8VZHK5L"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = firebase.firestore()
