import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Authcontext } from './AuthProvider';
import { toast } from 'sonner';
import {isTokenValid} from '../LoginPage/authUtils'


// const isTokenValid = (token) => {
//   if (!token) return false;

//   try {
//     const payload = JSON.parse(atob(token.split('.')[1]));
//     const expiry = payload.exp * 1000;
//     return Date.now() < expiry;
//   } catch {
//     return false;
//   }
// };

const Authorization = () => {
  const { logout,role:contextrole } = useContext(Authcontext);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role')
  const valid = isTokenValid(token);
  const location = useLocation();
  const navigate=useNavigate();

  console.log('This authorization and context role',contextrole)
  // if (!valid) {
  //   toast.error('please Login again');
  //   logout();
  //   return <Navigate to="/" replace />;
  // }
   useEffect(()=>{
    if(valid){
      if(role==='admin'){
        navigate('/admin');
      }
      else if(role==='vendor'){
        navigate('/user')
      }
    }
   },[]);


  useEffect(() => {
    if (!valid) {
      toast.error('Please login again');
      logout(); // ✅ Safe inside useEffect
    }
  }, [valid, logout]);
  if (!valid) return <Navigate to="/" replace />;

  if (role === 'vendor' && location.pathname.startsWith('/admin')) {
    toast.warning('Access denied : Vendor cannot acces admin panel');
    return <Navigate to='/user' replace />

  }
  else if (role === 'admin' && location.pathname.startsWith('/user')) {
    toast.warning("Access dendied :admin cannot access vendor Panel");
    return <Navigate to='/admin' replace />
  }

  return <Outlet />;
};

export default Authorization;

