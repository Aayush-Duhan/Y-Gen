import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const user = localStorage.getItem('adminUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // For demo purposes, we'll use a simple login function
  // In a real app, you would connect this to your backend
  async function login(email, password) {
    setError('');
    try {
      // For demo, we'll accept any email with admin@ygen.com and password 'admin123'
      // In a real app, this would be an API call to your backend
      if (email === 'admin@ygen.com' && password === 'admin123') {
        const user = { email, name: 'Admin User' };
        setCurrentUser(user);
        localStorage.setItem('adminUser', JSON.stringify(user));
        return user;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem('adminUser');
  }

  const value = {
    currentUser,
    login,
    logout,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}