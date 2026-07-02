import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import axiosClient from '../axiosClient'
import { BookOpen, MapPin, Clock, CalendarDays, Users, ArrowLeft, CheckCircle, XCircle, Clock3, Pencil, Plus } from 'lucide-react'

export default function AdminClassDetails() {

    const { id } = useParams()
    const navigate = useNavigate()
    const { setNotifications } = useAuth()
    const [classDetails, setClassDetails] = useState(null)
    const [studentToRemove, setStudentToRemove] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getClassDetails();
    }, [])

    const getClassDetails = () => {
        setLoading(true)
        axiosClient.get(`/classes/${id}`)
            .then(({ data }) => {
                setLoading(false)
                setClassDetails(data)
            })
            .catch((err) => {
                setLoading(false)
                setNotifications('Error occurred while fetching class details.')
                console.error('Error occurred while fetching class details:', err)
            })
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-navy border-t-yelo rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!classDetails) {
        return (
            <div className="flex items-center justify-center py-20 text-gray-400">
                <p>Class not found.</p>
            </div>
        )
    }

    const onRemoveStudent = () => {
        const std = studentToRemove;
        setStudentToRemove(null);
        axiosClient.delete(`/classes/${id}/users/${std.id}`)
            .then(() => {
                setNotifications(`Student ${std.first_name} ${std.last_name} removed successfully.`)
                getClassDetails()
            })
            .catch((err) => {
                setNotifications('Error occurred while removing student.')
                console.error('Error occurred while removing student:', err)
            })
    };

    return (
        <div className="p-6">

            {/* Back Button */}
            <button
                onClick={() => navigate('/admin/classes')}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-navy mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Classes
            </button>

            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-navy">{classDetails.name}</h1>
                    <p className="text-sm text-gray-500 mt-1">Class Details & Enrolled Students</p>
                </div>
                <div className="flex gap-3">
                <button
                    onClick={() => navigate(`/admin/classes/edit/${id}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-navy bg-gra hover:bg-navy hover:text-white rounded-lg transition-colors"
                >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit Class
                </button>
                <button
                    onClick={() => navigate('/admin/classes/quizzes')}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-yelo bg-yelo/10 border border-yelo hover:bg-yelo hover:text-white rounded-lg transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Quizzes
                </button>
                </div>
            </div>

            {/* Class Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-navy text-white flex items-center justify-center">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-navy">{classDetails.name}</h2>
                        <span className="text-xs text-white bg-yelo px-2 py-0.5 rounded-full">
                            {classDetails.batch}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Location</p>
                        <div className="flex items-center gap-1.5 text-sm text-navy font-medium">
                            <MapPin className="w-4 h-4 text-yelo" />
                            {classDetails.location}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Day</p>
                        <div className="flex items-center gap-1.5 text-sm text-navy font-medium">
                            <CalendarDays className="w-4 h-4 text-yelo" />
                            {classDetails.day}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Start Time</p>
                        <div className="flex items-center gap-1.5 text-sm text-navy font-medium">
                            <Clock className="w-4 h-4 text-yelo" />
                            {classDetails.start_time}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs text-gray-400 uppercase tracking-wider">End Time</p>
                        <div className="flex items-center gap-1.5 text-sm text-navy font-medium">
                            <Clock3 className="w-4 h-4 text-yelo" />
                            {classDetails.end_time}
                        </div>
                    </div>
                </div>

                {classDetails.ong_unit && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Ongoing Unit</p>
                        <p className="text-sm text-navy font-medium">{classDetails.ong_unit}</p>
                    </div>
                )}
            </div>

            {/* Enrolled Students */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-yelo" />
                        <h2 className="text-sm font-bold text-navy">Enrolled Students</h2>
                    </div>
                    <span className="text-xs text-gray-400">
                        {classDetails.users?.length || 0} student{classDetails.users?.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {classDetails.users && classDetails.users.length > 0 ? (
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="py-3 px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider">Student</th>
                                <th className="py-3 px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider">Email</th>
                                <th className="py-3 px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider">WhatsApp</th>
                                <th className="py-3 px-6 text-right text-xs font-semibold text-navy uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {classDetails.users.map((student) => (
                                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-3 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold shrink-0">
                                                {student.first_name?.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">
                                                {student.first_name} {student.last_name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-sm text-gray-600">{student.email}</td>
                                    <td className="py-3 px-6 text-sm text-gray-600">{student.whatsapp}</td>
                                    <td className="py-3 px-6 text-right">
                                        <button
                                            onClick={() => setStudentToRemove(student)}
                                            className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-12 text-gray-400">
                        <Users className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                        <p className="text-sm">No students enrolled in this class yet.</p>
                    </div>
                )}
            </div>
            {/* Remove Student Confirmation Modal */}
            {studentToRemove && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-bold text-navy mb-2">Remove Student</h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete{' '}
                            <span className="font-semibold text-gray-900">
                                {studentToRemove.first_name} {studentToRemove.last_name}
                            </span>{' '}
                            from this class? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setStudentToRemove(null)}
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onRemoveStudent}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}