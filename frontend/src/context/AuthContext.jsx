import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      await axios.post('https://quiz-n6d2.onrender.com/api/auth/login', { email, password });
      setUser(email);
      localStorage.setItem('user', JSON.stringify(email)); 
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
    }
  };

  const register = async (email, password) => {
    try {
      console.log(email);
      await axios.post('https://quiz-n6d2.onrender.com/api/auth/register', { email, password });
      setUser(email);
      localStorage.setItem('user', JSON.stringify(email));
    } catch (error) {
      console.error('Registration error:', error.response?.data?.message || error.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
