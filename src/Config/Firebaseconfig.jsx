import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig ={
    apiKey: "AIzaSyCGnpr8YokLv1iLmgs56ReNKWF0EhLAAlw",
    authDomain: "hospital-project-32106.firebaseapp.com",
    databaseURL: "https://hospital-project-32106-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hospital-project-32106",
    storageBucket: "hospital-project-32106.appspot.com",
    messagingSenderId: "167586953731",
    appId: "1:167586953731:web:65067ada49962bd740ac36",
    measurementId: "G-YQK78G07QY"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = firebase.firestore()
