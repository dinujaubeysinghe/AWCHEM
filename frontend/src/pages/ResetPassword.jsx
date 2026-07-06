import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axiosClient from './axiosClient'

export default function ResetPassword() {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')
    const emailFromUrl = searchParams.get('email')

    const [formData, setFormData] = useState({
        email: emailFromUrl || '',
        password: '',
        password_confirmation: '',
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        setLoading(true)
        setError(null)
        axiosClient.post('/reset-password', {
            ...formData,
            token,
        })
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
                    Reset Password
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-md">
                    {success ? (
                        <div className="text-center">
                            <p className="text-sm font-medium text-navy mb-2">
                                Password reset successfully!
                            </p>
                            <p className="text-sm text-gray-500 mb-6">
                                You can now log in with your new password.
                            </p>
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full bg-yelo text-white px-4 py-2 rounded-xl hover:bg-amber-500 transition duration-300"
                            >
                                Go to Login
                            </button>
                        </div>
                    ) : (
                        <>
                            {error && (
                                <div className="bg-red-50 border border-red-300 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Email */}
                            <div className="flex flex-col gap-1 mb-4">
                                <label className="text-sm font-medium text-navy">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                />
                            </div>

                            {/* New Password */}
                            <div className="flex flex-col gap-1 mb-4">
                                <label className="text-sm font-medium text-navy">
                                    New Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Min 8 characters"
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="flex flex-col gap-1 mb-6">
                                <label className="text-sm font-medium text-navy">
                                    Confirm Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    placeholder="Repeat new password"
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="w-full bg-yelo text-white px-4 py-2 rounded-xl hover:bg-amber-500 transition duration-300 disabled:opacity-50"
                            >
                                {loading ? 'Resetting...' : 'Reset Password'}
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