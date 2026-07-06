import React from 'react'
import register from '../assets/signup.webp'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import axiosClient from './axiosClient'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

export default function Signup() {

    const {setUser, setToken} = useAuth();
    const [error, setError] = useState(null);

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const addressRef = useRef();
    const whatsappRef = useRef();
    const nicRef = useRef();
    const guardianNameRef = useRef();
    const guardianPhoneRef = useRef();

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const payload = {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: confirmPasswordRef.current.value,
            address: addressRef.current.value,
            whatsapp: whatsappRef.current.value,
            nic: nicRef.current.value,
            guardian_name: guardianNameRef.current.value,
            guardian_phone: guardianPhoneRef.current.value
        };
        console.log(payload);
        axiosClient.post('/signup', payload)
            .then(({data}) => {
                setUser(data.user);
                setToken(data.token);
                navigate('/login');
            })
            .catch((err) => {
                console.error('Error occurred while registering:', err);
                if (err.response?.data?.errors) {
                    setError(err.response.data.errors);
                } else if (err.response?.data?.message) {
                    setError(err.response.data.message);
                } else {
                    setError(err.message || 'Something went wrong');
                }
            });
    };

  return (
    <div className="flex">
      <div className="w-1/2 min-h-screen bg-white flex items-center justify-start">
        <img src={register} alt="Register Illustration" className="w-3/4 h-screen rounded-r-4xl" />
      </div>

      <div className="w-1/2 min-h-screen flex flex-col items-center justify-center">
        <div className="text-5xl font-bold text-navy mb-8 mt-6">REGISTER</div>
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

          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <div className="flex ml-1">
                <label className="text-lg text-navy">First Name</label>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <input 
              type="text" 
              placeholder="First Name" 
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" 
              ref={firstNameRef}/>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex ml-1">
                <label className="text-lg text-navy">Last Name</label>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <input 
              type="text" 
              placeholder="Last Name" 
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" 
              ref={lastNameRef}/>
            </div>
          </div>

          <div className="flex ml-1">
            <label className="text-lg text-navy">Email</label>
            <span className="text-red-500 ml-1">*</span>
          </div>
          <input 
          type="text" 
          placeholder="Email" 
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" 
          ref={emailRef}/>

          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <div className="flex ml-1">
                <label className="text-lg text-navy">Password</label>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <input 
              type="password" 
              placeholder="Password" 
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" 
              ref={passwordRef}/>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex ml-1">
                <label className="text-lg text-navy">Confirm Password</label>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <input 
              type="password" 
              placeholder="Confirm Password" 
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" 
              ref={confirmPasswordRef}/>
            </div>
          </div>

          <div className="flex ml-1">
            <label className="text-lg text-navy">Address</label>
            <span className="text-red-500 ml-1">*</span>
          </div>
          <input 
          type="text" 
          placeholder="Address" 
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" 
          ref={addressRef}/>

          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <div className="flex ml-1">
                <label className="text-lg text-navy">Whatsapp</label>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <input 
              type="text" 
              placeholder="Whatsapp" 
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" 
              ref={whatsappRef}/>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex ml-1">
                <label className="text-lg text-navy">NIC</label>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <input 
              type="text" 
              placeholder="NIC" 
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" 
              ref={nicRef}/>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <div className="flex ml-1">
                <label className="text-lg text-navy">Guardian Name</label>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <input 
              type="text" 
              placeholder="Guardian Name" 
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" 
              ref={guardianNameRef}/>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex ml-1">
                <label className="text-lg text-navy">Guardian Phone</label>
                <span className="text-red-500 ml-1">*</span>
              </div>
              <input 
              type="text" 
              placeholder="Guardian Phone" 
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6" 
              ref={guardianPhoneRef}/>
            </div>
          </div>

          <button 
          type="submit" 
          className="bg-yelo text-white px-4 py-2 rounded-xl hover:bg-amber-500 transition duration-300"
          >
            Register
            </button>

          <div className="mt-4 text-center">
            <span className="text-gray-500">Already have an account? </span>
            <a href="/login" className="text-blue-500 hover:underline">LogIn</a>
          </div>
        </form>
      </div>
    </div>
  )
}