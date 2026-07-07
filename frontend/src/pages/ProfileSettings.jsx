import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import axiosClient from './axiosClient'
import { Pencil, X, User } from 'lucide-react'

const emptyProfile = {
    first_name: '',
    last_name: '',
    email: '',
    nic: '',
    address: '',
    whatsapp: '',
    guardian_name: '',
    guardian_phone: '',
}

export default function ProfileSettings() {

    const { user, setNotifications } = useAuth()
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState(emptyProfile)
    const [savedData, setSavedData] = useState(emptyProfile)
    const [isEditing, setIsEditing] = useState(false)
    const [saving, setSaving] = useState(false)

    // Guard: only fetch when user is available (user starts as undefined on first render)
    useEffect(() => {
        if (!user?.id) return
        axiosClient.get(`/users/${user.id}`)
            .then(({ data }) => {
                const profile = {
                    first_name: data.first_name ?? '',
                    last_name: data.last_name ?? '',
                    email: data.email ?? '',
                    nic: data.nic ?? '',
                    address: data.address ?? '',
                    whatsapp: data.whatsapp ?? '',
                    guardian_name: data.guardian_name ?? '',
                    guardian_phone: data.guardian_phone ?? '',
                }
                setFormData(profile)
                setSavedData(profile)
            })
            .catch((err) => {
                setNotifications('Error occurred while fetching user data.')
                console.error('Error occurred while fetching user data:', err)
            })
    }, [user?.id])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: null })
    }

    const handleEditClick = () => {
        setIsEditing(true)
    }

    const handleCancel = () => {
        setFormData(savedData)
        setErrors({})
        setIsEditing(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSaving(true)
        axiosClient.put(`/users/${user.id}`, formData)
            .then(() => {
                setSaving(false)
                setSavedData(formData)
                setIsEditing(false)
                setNotifications('Profile updated successfully.')
            })
            .catch((err) => {
                setSaving(false)
                if (err.response?.data?.errors) {
                    setErrors(err.response.data.errors)
                } else {
                    setNotifications('Error occurred while updating profile.')
                }
                console.error('Error occurred while updating profile:', err)
            })
    }

    // Show loading state while user context hasn't populated yet
    if (!user) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-navy border-t-yelo rounded-full animate-spin"></div>
            </div>
        )
    }

    const fields = [
        { name: 'first_name', label: 'First Name', type: 'text' },
        { name: 'last_name', label: 'Last Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email', readOnly: true },
        { name: 'nic', label: 'NIC', type: 'text' },
        { name: 'address', label: 'Address', type: 'text' },
        { name: 'whatsapp', label: 'WhatsApp', type: 'text' },
        { name: 'guardian_name', label: 'Guardian Name', type: 'text' },
        { name: 'guardian_phone', label: 'Guardian Phone', type: 'text' },
    ]

    return (
        <div className="p-4 sm:p-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-navy">
                        Profile Settings
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        View and manage your personal details.
                    </p>
                </div>

                {!isEditing && (
                    <button
                        onClick={handleEditClick}
                        className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-yelo bg-yelo/10 border border-yelo hover:bg-yelo hover:text-white rounded-lg transition-colors whitespace-nowrap"
                    >
                        <Pencil className="w-4 h-4" />
                        Edit Details
                    </button>
                )}
            </div>

            {/* Profile Card */}
            <div className="flex items-center justify-center">
            <div className=" bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden max-w-2xl">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center shrink-0">
                        <User className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                        <h2 className="text-sm font-bold text-navy truncate">
                            {savedData.first_name || user?.first_name} {savedData.last_name || user?.last_name}
                        </h2>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                        {fields.map((field) => (
                            <div key={field.name} className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-navy">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    disabled={!isEditing || field.readOnly}
                                    readOnly={!isEditing || field.readOnly}
                                    className={`px-4 py-2 text-sm border rounded-lg transition-colors ${
                                        isEditing && !field.readOnly
                                            ? 'border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-navy'
                                            : 'border-gray-200 bg-gray-50 text-gray-600 cursor-default'
                                    }`}
                                />
                                {errors[field.name] && (
                                    <p className="text-red-500 text-xs">{errors[field.name]}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    {isEditing && (
                        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-6 pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={saving}
                                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-4 py-2 text-sm font-medium text-white bg-navy hover:bg-opacity-90 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    )}
                </form>
            </div>
            </div>
        </div>
    )
}