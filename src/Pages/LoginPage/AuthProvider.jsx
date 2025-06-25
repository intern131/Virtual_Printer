import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Authcontext = createContext();

const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() < payload.exp * 1000;
  } catch {
    return false;
  }
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null );
  const [isAuth, setIsAuth] = useState(false);
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

  const login = (token,role) => {
    if(token && role){
    localStorage.setItem('token', token);
    localStorage.setItem('role',role);
    setToken(token);
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
    <Authcontext.Provider value={{ token, isAuth, login, logout,setIsAuth }}>
      {children}
    </Authcontext.Provider>
  );
};

export default AuthProvider;
