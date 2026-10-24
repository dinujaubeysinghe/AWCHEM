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
        <div className="relative flex min-h-screen overflow-hidden bg-slate-50 md:bg-white">
            <div className="absolute inset-x-0 top-0 h-[44vh] overflow-hidden rounded-b-[3rem] bg-navy md:hidden">
                <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full border-[28px] border-white/5" />
                <div className="absolute -left-10 top-32 h-32 w-32 rounded-full bg-yelo/10" />
                <div className="absolute right-12 bottom-4 h-20 w-20 rounded-full bg-yelo/10" />
            </div>

            {/* Left side — form */}
            <div className="relative z-10 w-full md:w-1/2 flex flex-col items-center justify-center px-5 sm:px-12 py-10 md:py-12">
                <div className="w-full max-w-md">
                    <div className="md:hidden mb-7 px-2 text-white">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-yelo">
                            <span className="h-2 w-2 rounded-full bg-yelo" />
                            AWCHEM <span className="text-white/60">|</span> SMART CHEMISTRY
                        </div>
                        <h1 className="mt-5 text-3xl font-bold tracking-tight">Welcome back</h1>
                        <p className="mt-1 text-sm text-white/70">Sign in to continue to your learning space.</p>
                    </div>
                    <div className="hidden md:block text-4xl sm:text-5xl font-bold text-navy mb-8 text-center">LOGIN</div>

                    <form
                        className="flex flex-col bg-white md:bg-[#f9f9f9] border border-gray-100 md:border-transparent p-5 sm:p-8 rounded-2xl shadow-xl md:shadow-md"
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
                            <label className="text-sm sm:text-base font-medium text-navy">Email</label>
                            <span className="text-red-500 ml-1">*</span>
                        </div>
                        <input
                            type="email"
                            placeholder="Email"
                            autoComplete="email"
                            className="bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yelo/60 focus:border-yelo mb-6"
                            ref={emailRef} />

                        {/* Password field */}
                        <div className="flex flex-col  ml-1">
                        <div className="flex ml-1">
                            <label className="text-sm sm:text-base font-medium text-navy">Password</label>
                            <span className="text-red-500 ml-1">*</span>
                        </div>
                        <input
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            className="bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yelo/60 focus:border-yelo"
                            ref={passwordRef} />

                         {/* Forgot password */}
                        <div className='mb-6 mt-1'>
                            <a href="/forgot-password" className="text-sm text-gray-500 hover:text-navy hover:underline">
                                Forgot Password?
                            </a>
                        </div>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="bg-yelo text-white font-semibold px-4 py-3 rounded-xl shadow-sm hover:bg-amber-500 hover:shadow-md transition duration-300 cursor-pointer">
                            Sign in
                        </button>

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
