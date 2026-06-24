import React from 'react'
import login from '../assets/login.webp'
export default function Login() {
  return (
    <div className="flex ">
      <div className="w-1/2 min-h-screen  flex flex-col items-center justify-center">
        <div className="text-5xl font-bold text-navy mb-8">LOGIN</div>
        <form className="flex flex-col w-3/4 bg-[#f9f9f9] p-8 rounded-2xl shadow-md">
          <div className="flex ml-1">
          <label className="text-lg text-navy">Email</label> <span className="text-red-500 ml-1">*</span>
          </div>
          <input type="text" placeholder="Email" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" />
          
          <div className="flex ml-1">
          <label className="text-lg text-navy">Password</label> <span className="text-red-500 ml-1">*</span>
          </div>
          <input type="password" placeholder="Password" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" />
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
