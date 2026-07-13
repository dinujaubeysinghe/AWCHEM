import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axiosClient from '../axiosClient'
import { Users, BookOpen, ClipboardList, TrendingUp, ArrowRight, Plus, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {

    const { user } = useAuth()
    const navigate = useNavigate()
    const { setNotifications } = useAuth()

    const [stats, setStats] = useState({
        totalStudents: 0,
        totalClasses: 0,
        totalQuizzes: 0,
    })
    const [recentStudents, setRecentStudents] = useState([])
    const [recentResults, setRecentResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [notices, setNotices] = useState([])
    const [showNoticeModal, setShowNoticeModal] = useState(false)
    const [noticeToEdit, setNoticeToEdit] = useState(null)
    const [noticeForm, setNoticeForm] = useState({ title: '', content: '' })
    const [noticeLoading, setNoticeLoading] = useState(false)
    const [deleteNoticeId, setDeleteNoticeId] = useState(null)
    const [deleteLoading, setDeleteLoading] = useState(false)

    useEffect(() => {
        getDashboardData()
        getNotice()
    }, [])

    const getNotice = () => {
        axiosClient.get('/notices')
            .then(({ data }) => {
                setNotices(data.data ?? [])
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const getDashboardData = () => {
        setLoading(true)
        Promise.all([
            axiosClient.get('/users'),
            axiosClient.get('/classes'),
            axiosClient.get('/quizzes'),
            axiosClient.get('/results'),
        ])
            .then(([usersRes, classesRes, quizzesRes, resultsRes]) => {
                setLoading(false)
                const users = usersRes.data.data ?? []
                const classes = classesRes.data.data ?? []
                const quizzes = quizzesRes.data.data ?? []
                const results = resultsRes.data.data ?? resultsRes.data ?? []

                setStats({
                    totalStudents: users.length,
                    totalClasses: classes.length,
                    totalQuizzes: quizzes.length,
                })

                setRecentStudents(users.slice(0, 5))
                setRecentResults(results.slice(0, 5))
            })
            .catch((err) => {
                setLoading(false)
                setNotifications('Error occurred while fetching dashboard data.')
                console.error(err)
            })
    }

    const openCreateNotice = () => {
        setNoticeToEdit(null)
        setNoticeForm({ title: '', content: '' })
        setShowNoticeModal(true)
    }

    const openEditNotice = (notice) => {
        setNoticeToEdit(notice)
        setNoticeForm({ title: notice.title, content: notice.content })
        setShowNoticeModal(true)
    }

    const handleNoticeSave = () => {
        setNoticeLoading(true)
        const request = noticeToEdit
            ? axiosClient.put(`/notices/${noticeToEdit.id}`, noticeForm)
            : axiosClient.post('/notices', noticeForm)

        request
            .then(() => {
                setNoticeLoading(false)
                setShowNoticeModal(false)
                setNoticeForm({ title: '', content: '' })
                setNotifications(noticeToEdit ? 'Notice updated.' : 'Notice created.')
                getNotice()
            })
            .catch((err) => {
                setNoticeLoading(false)
                setNotifications('Error occurred while saving notice.')
                console.error(err)
            })
    }

    const handleNoticeDelete = (noticeId) => {
        setDeleteLoading(true)
        axiosClient.delete(`/notices/${noticeId}`)
            .then(() => {
                setDeleteLoading(false)
                setNotices(prev => prev.filter(n => n.id !== noticeId))
                setNotifications('Notice deleted.')
                setDeleteNoticeId(null)
            })
            .catch((err) => {
                setDeleteLoading(false)
                setNotifications('Error occurred while deleting notice.')
                console.error(err)
            })
    }

    const statCards = [
        {
            label: 'Total Students',
            value: stats.totalStudents,
            icon: <Users className="w-6 h-6" />,
            bg: 'bg-navy',
            path: '/admin/students',
        },
        {
            label: 'Active Classes',
            value: stats.totalClasses,
            icon: <BookOpen className="w-6 h-6" />,
            bg: 'bg-navy',
            path: '/admin/classes',
        },
        {
            label: 'Total Quizzes',
            value: stats.totalQuizzes,
            icon: <ClipboardList className="w-6 h-6" />,
            bg: 'bg-navy',
            path: '/admin/quizzes',
        },
    ]

    const noticeToDelete = notices.find(n => n.id === deleteNoticeId) ?? null

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-navy border-t-yelo rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="p-4 sm:p-6">

            {/* Welcome Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-navy">
                        Welcome back, {user?.first_name}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Here's what's happening in your chemistry class today.
                    </p>
                </div>
                <button
                    onClick={openCreateNotice}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-yelo bg-yelo/10 border border-yelo hover:bg-yelo hover:text-white rounded-lg transition-colors whitespace-nowrap"
                >
                    <Plus className="w-4 h-4" />
                    Add Notice
                </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {statCards.map((card) => (
                    <div
                        key={card.label}
                        onClick={() => navigate(card.path)}
                        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
                    >
                        <div className={`${card.bg} text-white w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}>
                            {card.icon}
                        </div>
                        <div className="min-w-0">
                            <p className="text-2xl font-bold text-navy">{card.value}</p>
                            <p className="text-sm text-gray-500 truncate">{card.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Notice Section */}
            {notices.length > 0 && (
                <div className="flex flex-col gap-3 mb-8">
                    {notices.map((notice) => (
                        <div key={notice.id} className="bg-white border border-yelo rounded-2xl overflow-hidden">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-yelo px-4 py-3">
                                <h3 className="text-lg sm:text-2xl font-bold text-white min-w-0">
                                    {notice.title}
                                </h3>
                                <div className="flex items-center gap-2 shrink-0">
                                    <button
                                        onClick={() => openEditNotice(notice)}
                                        className="px-3 py-1.5 text-xs font-medium text-navy bg-white border border-gray-200 hover:bg-navy hover:text-white rounded-lg transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => setDeleteNoticeId(notice.id)}
                                        className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <p className="text-md sm:text-md text-gray-700 p-4 whitespace-pre-wrap ">
                                {notice.content}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Students */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-yelo" />
                            <h2 className="text-sm font-bold text-navy">Recent Students</h2>
                        </div>
                        <button
                            onClick={() => navigate('/admin/students')}
                            className="flex items-center gap-1 text-xs text-yelo hover:underline"
                        >
                            View all <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>

                    {recentStudents.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="py-3 px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider whitespace-nowrap">Student</th>
                                        <th className="py-3 px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider whitespace-nowrap">Email</th>
                                        <th className="py-3 px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider whitespace-nowrap">WhatsApp</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {recentStudents.map((student) => (
                                        <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-3 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold shrink-0">
                                                        {student.first_name?.charAt(0)?.toUpperCase()}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                                                        {student.first_name} {student.last_name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-sm text-gray-600 whitespace-nowrap">{student.email}</td>
                                            <td className="py-3 px-6 text-sm text-gray-600 whitespace-nowrap">{student.whatsapp}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-400">
                            <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                            <p className="text-sm">No students yet.</p>
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-6">

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-sm font-bold text-navy mb-4">Quick Actions</h2>
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => navigate('/admin/classes/create')}
                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-navy bg-gray-50 hover:bg-navy hover:text-white rounded-lg transition-colors flex items-center justify-between"
                            >
                                <span>+ Create Class</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => navigate('/admin/quizzes/create')}
                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-navy bg-gray-50 hover:bg-navy hover:text-white rounded-lg transition-colors flex items-center justify-between"
                            >
                                <span>+ Create Quiz</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => navigate('/admin/results')}
                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-navy bg-gray-50 hover:bg-navy hover:text-white rounded-lg transition-colors flex items-center justify-between"
                            >
                                <span>+ Add Results</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => navigate('/admin/students')}
                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-navy bg-gray-50 hover:bg-navy hover:text-white rounded-lg transition-colors flex items-center justify-between"
                            >
                                <span>View Students</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Recent Results */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-bold text-navy">Recent Results</h2>
                            <button
                                onClick={() => navigate('/admin/results')}
                                className="flex items-center gap-1 text-xs text-yelo hover:underline"
                            >
                                View all <ArrowRight className="w-3 h-3" />
                            </button>
                        </div>
                        {recentResults.length > 0 ? (
                            <div className="flex flex-col gap-3">
                                {recentResults.map((result) => (
                                    <div key={result.id} className="flex items-center justify-between gap-2">
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-navy truncate">{result.student_name}</p>
                                            <p className="text-xs text-gray-400 truncate">{result.quiz_title}</p>
                                        </div>
                                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full shrink-0 ${result.marks >= 75 ? 'bg-green-100 text-green-700' :
                                            result.marks >= 50 ? 'bg-yellow-100 text-yellow-600' :
                                                'bg-red-100 text-red-600'
                                            }`}>
                                            {result.marks}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-4 text-gray-400">
                                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                                <p className="text-sm">No results yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Notice Modal */}
            {showNoticeModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-navy">
                                {noticeToEdit ? 'Edit Notice' : 'Add Notice'}
                            </h2>
                            <button
                                onClick={() => setShowNoticeModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-navy">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={noticeForm.title}
                                    onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                                    placeholder="e.g. Class postponed this week"
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-navy">
                                    Content <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={noticeForm.content}
                                    onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                                    placeholder="Write the notice details here..."
                                    rows={6}
                                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy resize-y"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-6 pt-4 border-t border-gray-100">
                            <button
                                onClick={() => setShowNoticeModal(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleNoticeSave}
                                disabled={noticeLoading || !noticeForm.title.trim() || !noticeForm.content.trim()}
                                className="px-4 py-2 text-sm font-medium text-white bg-navy hover:bg-opacity-90 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {noticeLoading ? 'Saving...' : noticeToEdit ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteNoticeId && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-bold text-navy mb-2">Delete Notice</h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete{noticeToDelete ? ` "${noticeToDelete.title}"` : ' this notice'}? This action cannot be undone.
                        </p>
                        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                            <button
                                onClick={() => setDeleteNoticeId(null)}
                                disabled={deleteLoading}
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleNoticeDelete(deleteNoticeId)}
                                disabled={deleteLoading}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {deleteLoading ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}