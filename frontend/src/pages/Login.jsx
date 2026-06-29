import React from 'react'
import login from '../assets/login.webp'
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../context/AuthContext'
import axiosClient from './axiosClient'

export default function Login() {

  const {setUser, setToken} = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
                email: emailRef.current.value,
                password: passwordRef.current.value,   
            };
            console.log(payload);
            axiosClient.post('/login', payload)
                .then(({data}) => {
                    setUser(data.user);
                    setToken(data.token);
                    if (data.user.is_admin === true) {
                        navigate('/admin/dashboard');
                    } else {
                        navigate('/student/dashboard');
                    }
                })
                .catch((err) => {
                    console.error('Error occurred while logging in:', err);
                    if (err.response?.data?.errors) {
                        setError(err.response.data.errors);
                    } else if (err.response?.data?.message) {
                        setError(err.response.data.message);
                    } else {
                        setError(err.message || 'Something went wrong');
                    }
                });
   
  }

  return (
    <div className="flex ">
      <div className="w-1/2 min-h-screen  flex flex-col items-center justify-center">
        <div className="text-5xl font-bold text-navy mb-8">LOGIN</div>
        <form 
        className="flex flex-col w-3/4 bg-[#f9f9f9] p-8 rounded-2xl shadow-md" 
        onSubmit={handleSubmit}>

          {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Error! </strong>
                    <span className="block sm:inline">
                        {typeof error === 'string' ? (
                            error
                        ) : (
                            <ul className="list-disc pl-5 mt-1 text-sm">
                                {Object.keys(error).map((key) => (
                                    <li key={key}>
                                        {Array.isArray(error[key]) ? error[key].join(', ') : error[key]}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </span>
                </div>
            )}
          <div className="flex ml-1">
          <label className="text-lg text-navy">Email</label> <span className="text-red-500 ml-1">*</span>
          </div>
          <input 
          type="text" 
          placeholder="Email" 
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" 
          ref={emailRef}/>
          
          <div className="flex ml-1">
          <label className="text-lg text-navy">Password</label> <span className="text-red-500 ml-1">*</span>
          </div>
          <input 
          type="password" 
          placeholder="Password" 
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" 
          ref={passwordRef} />
          <button type="submit" className="bg-yelo text-white px-4 py-2 rounded-xl hover:bg-amber-500 transition duration-300">Login</button>
          <div className="mt-4 text-center">
            <span className="text-gray-500">Don't have an account? </span>
            <a href="/signup" className="text-blue-500 hover:underline">SignUp</a>
          </div>
        </form>
      </div>
      <div className="w-1/2 min-h-screen bg-white flex items-center justify-end my-6">
        <img src={login} alt="Login Illustration" className=" w-3/4 h-screen rounded-l-4xl" />
      </div>
    </div>
  )
}
