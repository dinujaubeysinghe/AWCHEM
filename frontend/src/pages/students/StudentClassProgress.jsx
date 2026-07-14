import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import axiosClient from '../axiosClient'
import {
    ArrowLeft, ClipboardCheck, ChevronDown, ChevronUp, FileText, Link2, CalendarDays
} from 'lucide-react'

export default function StudentClassProgress() {

    const { id } = useParams()
    const navigate = useNavigate()
    const { setNotifications } = useAuth()

    const [classDetails, setClassDetails] = useState(null)
    const [weeks, setWeeks] = useState([])
    const [loading, setLoading] = useState(false)
    const [expandedWeeks, setExpandedWeeks] = useState({})

    useEffect(() => {
        getClassDetails()
        getClassWeeks()
    }, [])

    const getClassDetails = () => {
        axiosClient.get(`/classes/${id}`)
            .then(({ data }) => {
                setClassDetails(data)
            })
            .catch((err) => {
                setNotifications('Error occurred while fetching class details.')
                console.error('Error occurred while fetching class details:', err)
            })
    }

    const getClassWeeks = () => {
        setLoading(true)
        axiosClient.get(`/classes/${id}/weeks`)
            .then(({ data }) => {
                setLoading(false)
                const list = Array.isArray(data) ? data : data.data ?? []
                setWeeks(list)

                const allOpen = {}
                list.forEach((w) => { allOpen[w.id] = true })
                setExpandedWeeks(allOpen)
            })
            .catch((err) => {
                setLoading(false)
                setNotifications('Error occurred while fetching class progress.')
                console.error('Error occurred while fetching class weeks:', err)
            })
    }

    const toggleWeek = (weekId) => {
        setExpandedWeeks((prev) => ({ ...prev, [weekId]: !prev[weekId] }))
    }

    const formatDateRange = (start, end) => {
        if (!start || !end) return ''
        const opts = { day: 'numeric', month: 'short' }
        const s = new Date(start).toLocaleDateString('en-GB', opts)
        const e = new Date(end).toLocaleDateString('en-GB', opts)
        return `${s} - ${e}`
    }

    return (
        <div className="p-6">

            {/* Back Button */}
            <button
                onClick={() => navigate('/student/classes')}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-navy mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to My Classes
            </button>

            {/* Page Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-navy text-white flex items-center justify-center shrink-0">
                    <ClipboardCheck className="w-5 h-5" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-navy">
                        {classDetails ? classDetails.name : 'Class Progress'}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Weekly Progress & Resources</p>
                </div>
            </div>

            {/* Weekly Progress */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100">
                    <ClipboardCheck className="w-5 h-5 text-yelo" />
                    <h2 className="text-sm font-bold text-navy">Progress</h2>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="w-6 h-6 border-4 border-navy border-t-yelo rounded-full animate-spin"></div>
                    </div>
                ) : weeks.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <ClipboardCheck className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                        <p className="text-sm">No progress has been posted for this class yet.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 p-6">
                        {weeks.map((week) => {
                            const isOpen = expandedWeeks[week.id]
                            return (
                                <div
                                    key={week.id}
                                    className="border border-gray-200 rounded-xl overflow-hidden"
                                >
                                    <div
                                        className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => toggleWeek(week.id)}
                                    >
                                        <div className="flex items-center gap-3">
                                            {isOpen ? (
                                                <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                                            )}
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    {week.lecture_name && (
                                                        <span className="text-lg text-navy font-bold">{week.lecture_name}</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-md text-gray-700 mt-0.5">
                                                    <CalendarDays className="w-3.5 h-3.5" />
                                                    {week.start_date}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-400 shrink-0">
                                            {week.resources?.length || 0} resource{week.resources?.length !== 1 ? 's' : ''}
                                        </span>
                                    </div>

                                    {isOpen && (
                                        <div className="px-5 pb-4 border-t border-gray-100 pt-4">
                                            {week.resources && week.resources.length > 0 ? (
                                                <div className="flex flex-col gap-2 pl-7">
                                                    {week.resources.map((resource) => (
                                                        <a
                                                            key={resource.id}
                                                            href={resource.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-navy font-medium transition-colors"
                                                        >
                                                            {resource.type === 'pdf' ? (
                                                                <FileText className="w-4 h-4 text-yelo shrink-0" />
                                                            ) : (
                                                                <Link2 className="w-4 h-4 text-yelo shrink-0" />
                                                            )}
                                                            <span className="truncate">{resource.label}</span>
                                                        </a>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-xs text-gray-400 pl-7">No resources added for this week yet.</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}