import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axiosClient from '../axiosClient'
import { MapPin, Clock, CalendarDays, Globe, Link, ClipboardList, CheckCircle2 } from 'lucide-react'

export default function StudentQuizzes() {

    const { setNotifications } = useAuth()
    const [quizzes, setQuizzes] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [activeTab, setActiveTab] = useState('pending')

    // IDs of quizzes marked as done — loaded from localStorage
    const [doneIds, setDoneIds] = useState(() => {
        try {
            const stored = localStorage.getItem('doneQuizzes')
            return stored ? JSON.parse(stored) : []
        } catch {
            return []
        }
    })

    useEffect(() => {
        getMyQuizzes()
    }, [])

    // Persist doneIds whenever they change
    useEffect(() => {
        localStorage.setItem('doneQuizzes', JSON.stringify(doneIds))
    }, [doneIds])

    const getMyQuizzes = () => {
        setLoading(true)
        axiosClient.get('/my/quizzes')
            .then(({ data }) => {
                setQuizzes(Array.isArray(data) ? data : data.data ?? [])
            })
            .catch((err) => {
                setNotifications('Error occurred while fetching quizzes.')
                console.error('Error fetching quizzes:', err)
            })
            .finally(() => setLoading(false))
    }

    // Toggle a quiz's done status
    const toggleDone = (quizId) => {
        setDoneIds((prev) =>
            prev.includes(quizId)
                ? prev.filter((id) => id !== quizId)
                : [...prev, quizId]
        )
    }

    // First filter by search term
    const searchedQuizzes = quizzes.filter((quiz) =>
        quiz.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.class_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Split into done / pending
    const pendingQuizzes = searchedQuizzes.filter((q) => !doneIds.includes(q.id))
    const doneQuizzes = searchedQuizzes.filter((q) => doneIds.includes(q.id))

    // Which list to show based on active tab
    const visibleQuizzes = activeTab === 'done' ? doneQuizzes : pendingQuizzes

    const getTypeBadge = (type) => {
        return type === 'online'
            ? <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">Online</span>
            : <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">Physical</span>
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-navy border-t-yelo rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-navy">My Quizzes</h1>
                </div>
                <input
                    type="text"
                    placeholder="Search quizzes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy w-64"
                />
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 mb-6 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('pending')}
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'pending'
                            ? 'border-navy text-navy'
                            : 'border-transparent text-gray-400 hover:text-gray-600'
                    }`}
                >
                    <ClipboardList className="w-4 h-4" />
                    Pending
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                        activeTab === 'pending' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                        {pendingQuizzes.length}
                    </span>
                </button>
                <button
                    onClick={() => setActiveTab('done')}
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'done'
                            ? 'border-green-600 text-green-600'
                            : 'border-transparent text-gray-400 hover:text-gray-600'
                    }`}
                >
                    <CheckCircle2 className="w-4 h-4" />
                    Done
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                        activeTab === 'done' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                        {doneQuizzes.length}
                    </span>
                </button>
            </div>

            {visibleQuizzes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {visibleQuizzes.map((quiz) => {
                        const isDone = doneIds.includes(quiz.id)
                        return (
                            <div
                                key={quiz.id}
                                className={`bg-white rounded-2xl shadow-sm border p-5 hover:shadow-md transition-shadow flex flex-col ${
                                    isDone ? 'border-green-200 bg-green-50/30' : 'border-gray-200'
                                }`}
                            >
                                {/* Card Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl text-white flex items-center justify-center shrink-0 ${
                                            isDone ? 'bg-green-600' : 'bg-navy'
                                        }`}>
                                            {isDone
                                                ? <ClipboardList className="w-5 h-5" />
                                                : <ClipboardList className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-navy">{quiz.title}</h3>
                                            <span className="text-xs text-white bg-yelo px-2 py-0.5 rounded-full">
                                                {quiz.class_name}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Details */}
                                <div className="flex flex-col gap-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Globe className="w-4 h-4 text-yelo shrink-0" />
                                        {getTypeBadge(quiz.type)}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <CalendarDays className="w-4 h-4 text-yelo shrink-0" />
                                        <span>{quiz.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Clock className="w-4 h-4 text-yelo shrink-0" />
                                        <span>{quiz.duration}</span>
                                    </div>
                                    {quiz.type === 'physical' && quiz.location && (
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
                                            {quiz.quiz_link && (
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Link className="w-4 h-4 text-yelo shrink-0" />
                                                    <a
                                                        href={quiz.quiz_link}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-blue-500 hover:underline truncate"
                                                    >
                                                        Quiz Link
                                                    </a>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                {/* Mark as done toggle — pushed to bottom */}
                                <label className="mt-auto flex items-center gap-2 text-sm font-medium cursor-pointer select-none pt-3 border-t border-gray-100">
                                    <input
                                        type="checkbox"
                                        checked={isDone}
                                        onChange={() => toggleDone(quiz.id)}
                                        className="w-4 h-4 accent-green-600 cursor-pointer"
                                    />
                                    <span className={isDone ? 'text-green-600' : 'text-gray-600'}>
                                        {isDone ? 'Completed' : 'Mark as done'}
                                    </span>
                                </label>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 text-center py-16 text-gray-400">
                    {activeTab === 'done'
                        ? <ClipboardList className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                        : <ClipboardList className="w-10 h-10 mx-auto mb-3 text-gray-300" />}
                    <p className="text-sm">
                        {activeTab === 'done'
                            ? 'No completed quizzes yet. Mark quizzes as done to see them here.'
                            : 'No pending quizzes found for your enrolled classes.'}
                    </p>
                </div>
            )}

            <div className="mt-6">
                <p className="text-sm text-gray-500">
                    Note: Quizzes are only visible for classes you are currently enrolled in.
                </p>
            </div>
        </div>
    )
}