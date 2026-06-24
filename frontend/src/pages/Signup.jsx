import React from 'react'
import register from '../assets/signup.webp'

export default function Signup() {
  return (
    <div className="flex">
      <div className="w-1/2 min-h-screen bg-white flex items-center justify-start">
        <img src={register} alt="Register Illustration" className="w-3/4 h-screen rounded-r-4xl" />
      </div>

      <div className="w-1/2 min-h-screen flex flex-col items-center justify-center">
        <div className="text-5xl font-bold text-navy mb-8 mt-6">REGISTER</div>
        <form className="flex flex-col w-3/4 bg-[#f9f9f9] p-8 rounded-2xl shadow-md">

          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <div className="flex ml-1">
                <label className="text-lg text-navy">First Name</label>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <input type="text" placeholder="First Name" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" />
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex ml-1">
                <label className="text-lg text-navy">Last Name</label>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <input type="text" placeholder="Last Name" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" />
            </div>
          </div>

          <div className="flex ml-1">
            <label className="text-lg text-navy">Email</label>
            <span className="text-red-500 ml-1">*</span>
          </div>
          <input type="text" placeholder="Email" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" />

          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <div className="flex ml-1">
                <label className="text-lg text-navy">Password</label>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <input type="password" placeholder="Password" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" />
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex ml-1">
                <label className="text-lg text-navy">Confirm Password</label>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <input type="password" placeholder="Confirm Password" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" />
            </div>
          </div>

          <div className="flex ml-1">
            <label className="text-lg text-navy">Address</label>
            <span className="text-red-500 ml-1">*</span>
          </div>
          <input type="text" placeholder="Address" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" />

          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <div className="flex ml-1">
                <label className="text-lg text-navy">Whatsapp</label>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <input type="text" placeholder="Whatsapp" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" />
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex ml-1">
                <label className="text-lg text-navy">NIC</label>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <input type="text" placeholder="NIC" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <div className="flex ml-1">
                <label className="text-lg text-navy">Guardian Name</label>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <input type="text" placeholder="Guardian Name" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" />
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex ml-1">
                <label className="text-lg text-navy">Guardian Phone</label>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <input type="text" placeholder="Guardian Phone" className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" />
            </div>
          </div>

          <button type="submit" className="bg-yelo text-white px-4 py-2 rounded-xl hover:bg-amber-500 transition duration-300">Register</button>

          <div className="mt-4 text-center">
            <span className="text-gray-500">Already have an account? </span>
            <a href="/login" className="text-blue-500 hover:underline">LogIn</a>
          </div>
        </form>
      </div>
    </div>
  )
}