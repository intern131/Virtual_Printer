import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner"
import { useEffect } from 'react';

const LoginPage = () => {
 const [User,setUser]=useState('');
 const [Password,setPassword]=useState('');
 const navigate=useNavigate();
 
 const handlelogin=async(e)=>{
   e.preventDefault();
   const Usertrim=User.trim();
   const passwordtrim=Password.trim()
   try{
  
    const response = await fetch('http://192.168.29.78:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: Usertrim,
          password: passwordtrim,
        }),
      });
       
      const data=await response.json();
    //   console.log(data);
       
      const {token}=data;

    if(token){
        localStorage.setItem('token',token);
        navigate('/dashboard');
    }
    else{
     toast.error('Invaild credentials');
    }
     
    
   }
   catch(err){
    console.error('Login Error',err);
   }
 }

   useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard'); // or '/home'
    }
  }, [navigate]);


  


  return (
    <>
   <main className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-white via-blue-50 to-blue-300">
  <form
    onSubmit={handlelogin}
    className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-8 space-y-6"
  >
    <div className="text-center">
      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
        Sign in to <span className="text-blue-600">MarketExcel</span>
      </h1>
      <p className="mt-2 text-sm text-gray-500">Enter your login details below</p>
    </div>

    <div className="space-y-4">
      <div>
        <label htmlFor="user" className="block text-sm font-medium text-gray-700">
          User ID
        </label>
        <input
          id="user"
          type="text"
          value={User}
          onChange={e => setUser(e.target.value.trimStart())}
          placeholder="Enter user ID"
          className="mt-1 block w-full px-4 py-3 text-sm border rounded-lg shadow-sm focus:outline-none bg-gray-50 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={Password}
          onChange={e => setPassword(e.target.value.trimStart())}
          placeholder="Enter password"
          className="mt-1 block w-full px-4 py-3 text-sm border rounded-lg shadow-sm focus:outline-none bg-gray-50 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
        />
      </div>
    </div>

    <button
      type="submit"
      className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
    >
      Login
    </button>
  </form>
</main>


    </>
  )
}

export default LoginPage
