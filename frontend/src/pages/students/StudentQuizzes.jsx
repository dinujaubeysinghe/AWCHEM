import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axiosClient from '../axiosClient'
import { MapPin, Clock, CalendarDays, Globe, Link, ClipboardList } from 'lucide-react'

export default function StudentQuizzes() {

    const { setNotifications } = useAuth()
    const [quizzes, setQuizzes] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        getMyQuizzes()
    }, [])

    const getMyQuizzes = () => {
        setLoading(true)
        axiosClient.get('/my/quizzes')
            .then(({ data }) => {
                setLoading(false)
                setQuizzes(Array.isArray(data) ? data : data.data ?? [])
            })
            .catch((err) => {
                setLoading(false)
                setNotifications('Error occurred while fetching quizzes.')
                console.error('Error fetching quizzes:', err)
            })
    }

    const filteredQuizzes = quizzes.filter((quiz) =>
        quiz.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.class_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )

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
                    <p className="text-sm text-gray-500 mt-1">
                        {filteredQuizzes.length} quiz{filteredQuizzes.length !== 1 ? 'zes' : ''} available
                    </p>
                </div>
                <input
                    type="text"
                    placeholder="Search quizzes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy w-64"
                />
            </div>

            {filteredQuizzes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredQuizzes.map((quiz) => (
                        <div
                            key={quiz.id}
                            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow flex flex-col"
                        >
                            {/* Card Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-navy text-white flex items-center justify-center shrink-0">
                                        <ClipboardList className="w-5 h-5" />
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
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 text-center py-16 text-gray-400">
                    <ClipboardList className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">No quizzes found for your enrolled classes.</p>
                </div>
            )}
        </div>
    )
}