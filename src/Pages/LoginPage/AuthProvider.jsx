import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {isTokenValid} from '../LoginPage/authUtils'

export const Authcontext = createContext();



const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [role,setrole]=useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && isTokenValid(storedToken)) {
      setToken(storedToken);
      setIsAuth(true);
    } else {
      localStorage.removeItem('token');
    }
  }, []);

  const login = (token, role) => {
    if (token && role) {
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      setToken(localStorage.getItem('token'));
      setIsAuth(true);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuth(false);
    navigate('/');
  };

  return (
    <Authcontext.Provider value={{ token, isAuth, login, logout, setIsAuth,role }}>
      {children}
    </Authcontext.Provider>
  );
};

export default AuthProvider;
