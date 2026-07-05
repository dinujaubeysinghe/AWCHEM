import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axiosClient from '../axiosClient'
import { Users, BookOpen, ClipboardList, TrendingUp, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {

    const { user } = useAuth()
    const navigate = useNavigate()
    const { setNotifications } = useAuth()

    const [stats, setStats] = useState({
        totalStudents: 0,
        totalClasses: 0,
        totalQuizzes: 0,
        totalResults: 0,
    })
    const [recentStudents, setRecentStudents] = useState([])
    const [recentResults, setRecentResults] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getDashboardData()
    }, [])

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
            bg: 'bg-yelo',
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

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-navy border-t-yelo rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="p-6">

            {/* Welcome Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-navy">
                    Welcome back, {user?.first_name}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Here's what's happening in your chemistry class today.
                </p>
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
                        <div>
                            <p className="text-2xl font-bold text-navy">{card.value}</p>
                            <p className="text-sm text-gray-500">{card.label}</p>
                        </div>
                    </div>
                ))}
            </div>

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
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="py-3 px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider">Student</th>
                                    <th className="py-3 px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider">Email</th>
                                    <th className="py-3 px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider">WhatsApp</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-3 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold shrink-0">
                                                    {student.first_name?.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="text-sm font-medium text-gray-900">
                                                    {student.first_name} {student.last_name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-sm text-gray-600">{student.email}</td>
                                        <td className="py-3 px-6 text-sm text-gray-600">{student.whatsapp}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-navy bg-gra hover:bg-navy hover:text-white rounded-lg transition-colors flex items-center justify-between"
                            >
                                <span>+ Create Class</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => navigate('/admin/quizzes/create')}
                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-navy bg-gra hover:bg-navy hover:text-white rounded-lg transition-colors flex items-center justify-between"
                            >
                                <span>+ Create Quiz</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => navigate('/admin/results')}
                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-navy bg-gra hover:bg-navy hover:text-white rounded-lg transition-colors flex items-center justify-between"
                            >
                                <span>+ Add Results</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => navigate('/admin/students')}
                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-navy bg-gra hover:bg-navy hover:text-white rounded-lg transition-colors flex items-center justify-between"
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
                                    <div key={result.id} className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-navy">{result.student_name}</p>
                                            <p className="text-xs text-gray-400">{result.quiz_title}</p>
                                        </div>
                                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                            result.marks >= 75 ? 'bg-green-100 text-green-700' :
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
        </div>
    )
}