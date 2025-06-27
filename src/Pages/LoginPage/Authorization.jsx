import React, { useContext,useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Authcontext } from './AuthProvider';
import { toast } from 'sonner';


const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000;
    return Date.now() < expiry;
  } catch {
    return false;
  }
};

const   Authorization = () => {
  const { logout } = useContext(Authcontext);
  const token = localStorage.getItem('token');
  const role=localStorage.getItem('role')
  const valid = isTokenValid(token);
  const location=useLocation();

  // if (!valid) {
  //   toast.error('please Login again');
  //   logout();
  //   return <Navigate to="/" replace />;
  // }
  useEffect(() => {
    if (!valid) {
      toast.error('Please login again');
      logout(); // ✅ Safe inside useEffect
    }
  }, [valid, logout]);
  if (!valid) return <Navigate to="/" replace />;

  if(role==='vendor'&&  location.pathname.startsWith('/admin')){
    toast.warning('Access denied : Vendor cannot acces admin panel');
    return <Navigate to='/user' replace/>

  }
  else if(role==='admin' && location.pathname.startsWith('/user')){
    toast.warning("Access dendied :admin cannot access vendor Panel");
    return <Navigate to='/admin'replace/>
  }

  return <Outlet />;
};

export default Authorization;
