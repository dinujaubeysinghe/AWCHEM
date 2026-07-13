import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import axiosClient from '../axiosClient'
import {
    BookOpen, MapPin, Clock, CalendarDays, Users, ArrowLeft, Clock3, Pencil, Plus, ClipboardList,
    Globe, Trash2
} from 'lucide-react'

export default function AdminClassDetails() {

    const { id } = useParams()
    const navigate = useNavigate()
    const { setNotifications } = useAuth()
    const [classDetails, setClassDetails] = useState(null)
    const [studentToRemove, setStudentToRemove] = useState(null)
    const [loading, setLoading] = useState(false)

    const [quizToEdit, setQuizToEdit] = useState(null)
    const [assignLoading, setAssignLoading] = useState(false)
    const [showAssignQuiz, setShowAssignQuiz] = useState(false)
    const [errors, setErrors] = useState({})
    const [quizToRemove, setQuizToRemove] = useState(null)
    const [allQuizzes, setAllQuizzes] = useState([])
    const [classQuizzes, setClassQuizzes] = useState([])
    const [formData, setFormData] = useState({
        quiz_id: '',
        type: 'physical',
        date: '',
        duration: '',
        location: '',
        start_time: '',
        end_time: '',
        quiz_link: '',
    })

    useEffect(() => {
        getClassDetails();
        getAllQuizzes();
        getClassQuizzes();
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

    const getQuizDetails = (quizId) => {
        axiosClient.get(`/classes/${id}/quizzes/${quizId}`)
            .then(({ data }) => {
                setFormData({
                    quiz_id: data.quiz_id,
                    type: data.type,
                    date: data.date,
                    duration: data.duration,
                    location: data.location || "",
                    start_time: data.start_time || "",
                    end_time: data.end_time || "",
                    quiz_link: data.quiz_link || "",
                })
            })
            .catch((err) => {
                setNotifications('Error occurred while fetching quiz details.')
                console.error('Error occurred while fetching quiz details:', err)
            })
    }

    const getAllQuizzes = () => {
        axiosClient.get(`/quizzes/all`)
            .then(({ data }) => {
                console.log('Quizzes fetched:', data);
                setAllQuizzes(Array.isArray(data) ? data : data.data ?? [])
            })
            .catch((err) => {
                setNotifications('Error occurred while fetching quizzes.')
                console.error('Error occurred while fetching quizzes:', err)
            })
    }

    const getClassQuizzes = () => {
        axiosClient.get(`/classes/${id}/quizzes`)
            .then(({ data }) => {
                console.log('Class quizzes fetched:', data);
                setClassQuizzes(Array.isArray(data) ? data : data.data ?? [])
            })
            .catch((err) => {
                setNotifications('Error occurred while fetching class quizzes.')
                console.error('Error occurred while fetching class quizzes:', err)
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
    }

    const resetForm = () => {
        setFormData({
            quiz_id: '',
            type: 'physical',
            date: '',
            duration: '',
            location: '',
            start_time: '',
            end_time: '',
            quiz_link: '',
        })
        setErrors({})
    }

    const handleAssignSubmit = () => {
        setAssignLoading(true)  
        axiosClient.post(`/classes/${id}/quizzes`, formData)
            .then(() => {
                setAssignLoading(false)  
                setNotifications('Quiz assigned to class successfully.')
                setShowAssignQuiz(false)
                resetForm()
                getClassQuizzes()
            })
            .catch((err) => {
                setAssignLoading(false)  // changed from setLoading
                setNotifications('Error occurred while assigning quiz to class.')
                console.error('Error occurred while assigning quiz to class:', err)
            })
    }
    const handleEditSubmit = () => {
        setAssignLoading(true)
        axiosClient.put(`/classes/${id}/quizzes/${quizToEdit.id}`, formData)
            .then(() => {
                setAssignLoading(false)
                setNotifications('Quiz updated successfully.')
                setQuizToEdit(null)
                resetForm()
                getClassQuizzes()
            })
            .catch((err) => {
                setAssignLoading(false)
                if (err.response?.data?.errors) {
                    setErrors(err.response.data.errors)
                } else {
                    setNotifications('Error occurred while updating quiz.')
                }
                console.error(err)
            })
    }

    const onEditQuiz = (quiz) => {
    setQuizToEdit(quiz)
    setFormData({
        quiz_id: quiz.quiz_id,
        type: quiz.type,
        date: quiz.date,
        duration: quiz.duration,
        location: quiz.location || '',
        start_time: quiz.start_time || '',
        end_time: quiz.end_time || '',
        quiz_link: quiz.quiz_link || '',
    })
}

    const onRemoveQuiz = () => {
        const quiz = quizToRemove;
        setQuizToRemove(null);
        axiosClient.delete(`/classes/${id}/quizzes/${quiz.id}`)
            .then(() => {
                setNotifications(`${quiz.title} removed successfully.`)
                getClassQuizzes()
            })
            .catch((err) => {
                setNotifications('Error occurred while removing quiz.')
                console.error('Error occurred while removing quiz:', err)
            })
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: null })
    }

    const getTypeBadge = (type) => {
        return type === 'online'
            ? <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">Online</span>
            : <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">Physical</span>
    }

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

            {/* Quiz Assignments */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 px-6 py-4">
                    <div className="flex items-center gap-2">
                        <ClipboardList className="w-5 h-5 text-yelo" />
                        <h2 className="text-sm font-bold text-navy">Quiz Assignments</h2>
                    </div>
                    <button
                        onClick={() => setShowAssignQuiz(true)}
                        className="flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium text-yelo bg-yelo/10 border border-yelo hover:bg-yelo hover:text-white rounded-lg transition-colors self-start sm:self-auto">
                        <Plus className="w-3.5 h-3.5" />
                        Assign Quiz
                    </button>
                </div>

                {classQuizzes.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                        {classQuizzes.map((quiz) => (
                            <div
                                key={quiz.id}
                                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer flex flex-col"
                            >
                                {/* Card Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-navy text-white flex items-center justify-center shrink-0">
                                            <BookOpen className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-navy">{quiz.title}</h3>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Details */}
                                <div className="flex flex-col gap-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Globe className="w-4 h-4 text-yelo shrink-0" />
                                        <span>{getTypeBadge(quiz.type)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <CalendarDays className="w-4 h-4 text-yelo shrink-0" />
                                        <span>{quiz.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <CalendarDays className="w-4 h-4 text-yelo shrink-0" />
                                        <span>{quiz.duration}</span>
                                    </div>
                                    {quiz.type === 'physical' && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <MapPin className="w-4 h-4 text-yelo shrink-0" />
                                            <span>{quiz.location}</span>
                                        </div>
                                    )}
                                    {quiz.type === 'online' && (
                                        <>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Clock className="w-4 h-4 text-yelo shrink-0" />
                                                <span>{quiz.start_time} — {quiz.end_time}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <BookOpen className="w-4 h-4 text-yelo shrink-0" />
                                                <span>{quiz.quiz_link}</span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Card Actions */}
                                <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100 mt-auto">
                                    <button
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            onEditQuiz(quiz)
                                        }}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-navy bg-gra hover:bg-navy hover:text-white rounded-lg transition-colors">
                                        <Pencil className="w-3.5 h-3.5" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            setQuizToRemove(quiz)
                                        }}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-500 hover:text-white rounded-lg transition-colors">
                                        <Trash2 className="w-3.5 h-3.5" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 text-center py-16 text-gray-400">
                        <BookOpen className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                        <p className="text-sm">No quizzes found.</p>
                    </div>
                )}
            </div>

            {/* Enrolled Students */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mt-6">
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
                                                {student.first_name?.charAt(0)?.toUpperCase()}
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

            {/* Remove Quiz Confirmation Modal */}
            {quizToRemove && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-bold text-navy mb-2">Remove Quiz</h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to remove this quiz from the class? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setQuizToRemove(null)}
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onRemoveQuiz}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Edit Quiz Modal */}
            {quizToEdit && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h2 className="text-lg font-bold text-navy mb-4">Edit Quiz Assignment</h2>
                        <div className="flex flex-col gap-4">
                            {/* Quiz Dropdown */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-navy">
                                    Quiz <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="quiz_id"
                                    value={formData.quiz_id}
                                    onChange={handleChange}
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                >
                                    <option value="">Select Quiz</option>
                                    {allQuizzes.map((quiz) => (
                                        <option key={quiz.id} value={quiz.id}>{quiz.title}</option>
                                    ))}
                                </select>
                                {errors.quiz_id && <span className="text-xs text-red-500">{errors.quiz_id[0]}</span>}
                            </div>

                            {/* Type */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-navy">
                                    Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                >
                                    <option value="physical">Physical</option>
                                    <option value="online">Online</option>
                                </select>
                                {errors.type && <span className="text-xs text-red-500">{errors.type[0]}</span>}
                            </div>

                            {/* Date */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-navy">
                                    Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                />
                                {errors.date && <span className="text-xs text-red-500">{errors.date[0]}</span>}
                            </div>

                            {/* Duration */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-navy">
                                    Duration (minutes) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    placeholder="e.g. 60"
                                    min="1"
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                />
                                {errors.duration && <span className="text-xs text-red-500">{errors.duration[0]}</span>}
                            </div>

                            {/* Physical only - Location */}
                            {formData.type === 'physical' && (
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-navy">
                                        Location <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g. Room 101"
                                        className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                    />
                                    {errors.location && <span className="text-xs text-red-500">{errors.location[0]}</span>}
                                </div>
                            )}

                            {/* Online only fields */}
                            {formData.type === 'online' && (
                                <>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col gap-1 flex-1">
                                            <label className="text-sm font-medium text-navy">
                                                Start Time <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="time"
                                                name="start_time"
                                                value={formData.start_time}
                                                onChange={handleChange}
                                                className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                            />
                                            {errors.start_time && <span className="text-xs text-red-500">{errors.start_time[0]}</span>}
                                        </div>
                                        <div className="flex flex-col gap-1 flex-1">
                                            <label className="text-sm font-medium text-navy">
                                                End Time <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="time"
                                                name="end_time"
                                                value={formData.end_time}
                                                onChange={handleChange}
                                                className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                            />
                                            {errors.end_time && <span className="text-xs text-red-500">{errors.end_time[0]}</span>}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-medium text-navy">
                                            Quiz Link <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="url"
                                            name="quiz_link"
                                            value={formData.quiz_link}
                                            onChange={handleChange}
                                            placeholder="e.g. https://example.com/quiz"
                                            className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                        />
                                        {errors.quiz_link && <span className="text-xs text-red-500">{errors.quiz_link[0]}</span>}
                                    </div>
                                </>
                            )}

                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    onClick={() => {
                                        setQuizToEdit(null)
                                        resetForm()
                                    }}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleEditSubmit}  
                                    className={`px-4 py-2 text-sm font-medium text-white bg-navy hover:bg-navy/90 rounded-lg transition-colors ${assignLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={assignLoading}
                                >
                                    {assignLoading ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Assign Quiz Modal */}
            {showAssignQuiz && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h2 className="text-lg font-bold text-navy mb-4">Assign Quiz</h2>
                        <div className="flex flex-col gap-4">

                            {/* Quiz Dropdown */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-navy">
                                    Quiz <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="quiz_id"
                                    value={formData.quiz_id}
                                    onChange={handleChange}
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                >
                                    <option value="">Select Quiz</option>
                                    {allQuizzes.map((quiz) => (
                                        <option key={quiz.id} value={quiz.id}>{quiz.title}</option>
                                    ))}
                                </select>
                                {errors.quiz_id && <span className="text-xs text-red-500">{errors.quiz_id[0]}</span>}
                            </div>

                            {/* Type */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-navy">
                                    Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                >
                                    <option value="physical">Physical</option>
                                    <option value="online">Online</option>
                                </select>
                                {errors.type && <span className="text-xs text-red-500">{errors.type[0]}</span>}
                            </div>

                            {/* Date */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-navy">
                                    Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                />
                                {errors.date && <span className="text-xs text-red-500">{errors.date[0]}</span>}
                            </div>

                            {/* Duration */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-navy">
                                    Duration (minutes) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    placeholder="e.g. 60"
                                    min="1"
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                />
                                {errors.duration && <span className="text-xs text-red-500">{errors.duration[0]}</span>}
                            </div>

                            {/* Physical only - Location */}
                            {formData.type === 'physical' && (
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-navy">
                                        Location <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g. Room 101"
                                        className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                    />
                                    {errors.location && <span className="text-xs text-red-500">{errors.location[0]}</span>}
                                </div>
                            )}

                            {/* Online only fields */}
                            {formData.type === 'online' && (
                                <>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col gap-1 flex-1">
                                            <label className="text-sm font-medium text-navy">
                                                Start Time <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="time"
                                                name="start_time"
                                                value={formData.start_time}
                                                onChange={handleChange}
                                                className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                            />
                                            {errors.start_time && <span className="text-xs text-red-500">{errors.start_time[0]}</span>}
                                        </div>
                                        <div className="flex flex-col gap-1 flex-1">
                                            <label className="text-sm font-medium text-navy">
                                                End Time <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="time"
                                                name="end_time"
                                                value={formData.end_time}
                                                onChange={handleChange}
                                                className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                            />
                                            {errors.end_time && <span className="text-xs text-red-500">{errors.end_time[0]}</span>}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-sm font-medium text-navy">
                                            Quiz Link <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="url"
                                            name="quiz_link"
                                            value={formData.quiz_link}
                                            onChange={handleChange}
                                            placeholder="https://..."
                                            className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                        />
                                        {errors.quiz_link && <span className="text-xs text-red-500">{errors.quiz_link[0]}</span>}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Modal Buttons */}
                        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-100">
                            <button
                                onClick={() => {
                                    setShowAssignQuiz(false)
                                    resetForm()
                                }}
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAssignSubmit}
                                disabled={assignLoading}  // changed from loading
                                className="px-4 py-2 text-sm font-medium text-white bg-navy hover:bg-opacity-90 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {assignLoading ? 'Assigning...' : 'Assign Quiz'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}