// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect , useContext} from 'react';
import {db} from '../Config/Firebaseconfig'
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { Navigate, useNavigate } from 'react-router-dom';

// Create AuthContext
export const AuthContext = createContext();


// AuthProvider to handle auth state and persistence
export const AuthProvider = ({ children }) => {
  const value = localStorage.getItem('key');
  let val = false
  if (value){
    val= true
  }
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  // Check for token on initial render (session persistence)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Simulate login and store token in localStorage
  const login = async (nip, password) => {
    try {
      console.log(nip, password)
      if (nip === 'user' && password === 'user') {
        localStorage.setItem('authToken', 'session-token');
        setIsAuthenticated(true);
        console.log(isAuthenticated, " auth hardcode")
      }
      if (nip!== 'user') {
        const q = query(collection(db, 'employess'), where('NIP', '==', nip));
        const userData = await getDocs(q);
        console.log("data",userData)
        console.log("data user",userData.docs[0].data())

        
        if (!userData.empty && userData.docs[0].data().Role === "Admin" && userData.docs[0].data().Password === password && userData.docs[0].data().NIP === nip) {
          console.log("admin")
          localStorage.setItem('authToken', 'session-token');
          setIsAuthenticated(true);
          console.log(isAuthenticated, " auth db")
        }
      }
      console.log(isAuthenticated, " auth")
      
    } catch (error) {
      // throw new Error(error.message);
    }
    
  };

  // Logout functionality
  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
