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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md">
                <div className="text-3xl font-bold text-navy text-center mb-8">
                    Forgot Password
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-md">
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
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={loading || !email}
                                className="w-full bg-yelo text-white px-4 py-2 rounded-xl hover:bg-amber-500 transition duration-300 disabled:opacity-50"
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