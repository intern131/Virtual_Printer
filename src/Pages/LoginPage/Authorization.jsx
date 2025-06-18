import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'

const Authorization =  () => {
  const token =localStorage.getItem('token');
  return token ?<Outlet/> :<Navigate to='/'/>
}

export default Authorization
