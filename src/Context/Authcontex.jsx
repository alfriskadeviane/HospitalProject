// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider to handle auth state and persistence
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for token on initial render (session persistence)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Simulate login and store token in localStorage
  const login = (nip, password) => {
    if (nip === 'user' && password === 'user') {
      localStorage.setItem('authToken', 'session-token');
      setIsAuthenticated(true);
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
