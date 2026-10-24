import React, { useState } from 'react'
import axiosClient from './axiosClient'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = () => {
        setLoading(true)
        setError(null)
        axiosClient.post('/forgot-password', { email })
            .then(() => {
                setLoading(false)
                setSuccess(true)
            })
            .catch((err) => {
                setLoading(false)
                setError(err.response?.data?.message || 'Something went wrong.')
            })
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 px-4 md:bg-white">
            <div className="absolute inset-x-0 top-0 h-[42vh] overflow-hidden rounded-b-[3rem] bg-navy md:hidden">
                <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full border-[28px] border-white/5" />
                <div className="absolute -left-10 top-32 h-32 w-32 rounded-full bg-yelo/10" />
                <div className="absolute right-12 bottom-4 h-20 w-20 rounded-full bg-yelo/10" />
            </div>
            <div className="relative z-10 w-full max-w-md py-10">
                <div className="md:hidden mb-7 px-2 text-white">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-yelo">
                        <span className="h-2 w-2 rounded-full bg-yelo" />
                        AWCHEM <span className="text-white/60">|</span> SMART CHEMISTRY
                    </div>
                    <h1 className="mt-5 text-3xl font-bold tracking-tight">Reset your password</h1>
                    <p className="mt-1 text-sm text-white/70">We’ll help you get back to your learning space.</p>
                </div>
                <div className="hidden md:block text-3xl font-bold text-navy text-center mb-8">
                    Forgot Password
                </div>

                <div className="bg-white border border-gray-100 p-5 sm:p-8 rounded-2xl shadow-xl md:shadow-md">
                    {success ? (
                        <div className="text-center">
                            <p className="text-sm font-medium text-navy mb-2">
                                Reset link sent!
                            </p>
                            <p className="text-sm text-gray-500 mb-6">
                                Check your email inbox and click the reset link to set a new password.
                            </p>
                            <button
                                onClick={() => navigate('/login')}
                                className="text-sm text-yelo hover:underline"
                            >
                                Back to Login
                            </button>
                        </div>
                    ) : (
                        <>
                            <p className="text-sm text-gray-500 mb-6">
                                Enter your registered email address and we'll send you a link to reset your password.
                            </p>

                            {error && (
                                <div className="bg-red-50 border border-red-300 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="flex flex-col gap-1 mb-6">
                                <label className="text-sm font-medium text-navy">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="bg-slate-50 px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yelo/60 focus:border-yelo"
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={loading || !email}
                                className="w-full bg-yelo text-white font-semibold px-4 py-3 rounded-xl shadow-sm hover:bg-amber-500 hover:shadow-md transition duration-300 disabled:opacity-50"
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>

                            <div className="mt-4 text-center">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="text-sm text-gray-500 hover:text-navy hover:underline"
                                >
                                    Back to Login
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
