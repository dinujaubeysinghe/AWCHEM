import React from 'react'
import login from '../assets/login.webp'
import { useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import axiosClient from './axiosClient'

export default function Login() {

    const { setUser, setToken } = useAuth();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()
    const justVerified = searchParams.get('verified') === '1'

    const [emailNotVerified, setEmailNotVerified] = useState(false)
    const [resendLoading, setResendLoading] = useState(false)
    const [resendSuccess, setResendSuccess] = useState(false)

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null)
        setEmailNotVerified(false)

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        axiosClient.post('/login', payload)
            .then(({ data }) => {
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
                if (err.response?.status === 403 && err.response?.data?.email_verified === false) {
                    setEmailNotVerified(true)
                } else if (err.response?.data?.errors) {
                    setError(err.response.data.errors);
                } else if (err.response?.data?.message) {
                    setError(err.response.data.message);
                } else {
                    setError(err.message || 'Something went wrong');
                }
            });
    }

    const handleResend = () => {
        setResendLoading(true)
        axiosClient.post('/email/verification-notification')
            .then(() => {
                setResendLoading(false)
                setResendSuccess(true)
            })
            .catch(() => {
                setResendLoading(false)
            })
    }

    return (
        <div className="flex min-h-screen">

            {/* Left side — form */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 sm:px-12 py-12">
                <div className="w-full max-w-md">
                    <div className="text-4xl sm:text-5xl font-bold text-navy mb-8 text-center">LOGIN</div>

                    <form
                        className="flex flex-col bg-[#f9f9f9] p-6 sm:p-8 rounded-2xl shadow-md"
                        onSubmit={handleSubmit}>

                        {/* Email verified success */}
                        {justVerified && (
                            <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm font-medium">
                                ✅ Email verified successfully! You can now log in.
                            </div>
                        )}

                        {/* Error message */}
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

                        {/* Email not verified warning */}
                        {emailNotVerified && (
                            <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg mb-4 text-sm">
                                <p className="font-semibold mb-1">Email not verified</p>
                                <p className="mb-2">Please check your inbox and click the verification link before logging in.</p>
                                {resendSuccess ? (
                                    <p className="text-green-600 font-medium">✅ Verification email sent! Check your inbox.</p>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        disabled={resendLoading}
                                        className="text-yelo underline font-medium disabled:opacity-50"
                                    >
                                        {resendLoading ? 'Sending...' : 'Resend verification email'}
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Email field */}
                        <div className="flex ml-1 mb-1">
                            <label className="text-lg text-navy">Email</label>
                            <span className="text-red-500 ml-1">*</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Email"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6"
                            ref={emailRef} />

                        {/* Password field */}
                        <div className="flex ml-1 mb-1">
                            <label className="text-lg text-navy">Password</label>
                            <span className="text-red-500 ml-1">*</span>
                        </div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-navy mb-6"
                            ref={passwordRef} />

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="bg-yelo text-white px-4 py-2 rounded-xl hover:bg-amber-500 transition duration-300">
                            Login
                        </button>

                        {/* Forgot password */}
                        <div className="mt-3 text-center">
                            <a href="/forgot-password" className="text-sm text-gray-500 hover:text-navy hover:underline">
                                Forgot Password?
                            </a>
                        </div>

                        {/* Sign up link */}
                        <div className="mt-3 text-center">
                            <span className="text-gray-500">Don't have an account? </span>
                            <a href="/signup" className="text-blue-500 hover:underline">SignUp</a>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right side — image (hidden on mobile) */}
            <div className="hidden md:flex w-1/2 min-h-screen bg-white items-center justify-end my-6">
                <img
                    src={login}
                    alt="Login Illustration"
                    className="w-3/4 h-screen rounded-l-4xl object-cover"
                />
            </div>
        </div>
    )
}