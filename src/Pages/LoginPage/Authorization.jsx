import React, { useEffect } from 'react'
import { Navigate,Outlet } from 'react-router-dom'


const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000; // convert to ms
    return Date.now() < expiry;
  } catch {
    return false;
  }
};
const Authorization =  () => {


  const token = localStorage.getItem('token');
  const valid = isTokenValid(token); 


  
   return valid ? <Outlet/> :<Navigate to ='/' replace/>

 
}

export default Authorization
