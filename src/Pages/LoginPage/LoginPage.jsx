import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner"
import { useEffect } from 'react';
import { Authcontext } from './AuthProvider';
import axios from 'axios';

const LoginPage = () => {
  const [User, setUser] = useState('');
  const [Password, setPassword] = useState('');
  const { login } = useContext(Authcontext);
  const { token } = useContext(Authcontext);

  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    const Usertrim = User.trim();
    const passwordtrim = Password.trim()
    const baseurl=import.meta.env.VITE_LOGIN_API
    try {


      const response = await axios.post( baseurl, {
        username: Usertrim,
        password: passwordtrim,
      })
      const data = response.data
      console.log(data);

      const { token, role, message } = data;
      if (token && role) {
        login(token, role);
        if (role === 'admin') {
          navigate('/admin');
          toast.success(`Welcome admin  ${message}`);

        }
        else if (role === 'vendor') {
          navigate('/user');
          toast.success(`welcome User ${message}`)
        }
        else {
          navigate('/')
          toast.error('Invaild credential');
        }


      }


    }
    catch (err) {
      console.error('Login Error', err);
      toast.error('Login Failed');

    }
  }

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isValid = Date.now() < payload.exp * 1000;
        const role = localStorage.getItem("role");

        if (isValid) {
          if (role === 'admin') navigate('/admin');
          else if (role === 'vendor') navigate('/user');
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
        }
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      }
    }
  }, []);








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
