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
        <div className="min-w-0 p-4 sm:p-6">

            {/* Back Button */}
            <button
                onClick={() => navigate('/student/classes')}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-navy mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to My Classes
            </button>

            {/* Page Header */}
            <div className="relative isolate overflow-hidden rounded-2xl bg-navy px-5 py-6 sm:px-7 sm:py-8 mb-6 shadow-sm">
                <div className="absolute -right-10 -top-14 h-44 w-44 rounded-full border-[24px] border-white/5" />
                <div className="absolute right-16 -bottom-20 h-36 w-36 rounded-full bg-yelo/10" />
                <div className="relative flex items-center gap-4">
                    <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-white/10 text-yelo ring-1 ring-white/15 shrink-0">
                        <ClipboardCheck className="h-7 w-7 sm:h-8 sm:w-8" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-yelo">Class Progress</p>
                        <h1 className="mt-1 text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-white break-words">
                            {classDetails ? classDetails.name : 'Your class'}
                        </h1>
                        <p className="mt-2 text-sm text-white/70">Weekly lessons and learning resources</p>
                    </div>
                </div>
            </div>

            {/* Weekly Progress */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex items-center gap-2 px-4 sm:px-6 py-4 border-b border-gray-100">
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
                    <div className="flex flex-col gap-3 sm:gap-4 p-3 sm:p-6">
                        {weeks.map((week) => {
                            const isOpen = expandedWeeks[week.id]
                            return (
                                <div
                                    key={week.id}
                                    className="border border-gray-200 rounded-xl overflow-hidden"
                                >
                                    <button
                                        type="button"
                                        className="flex w-full items-center justify-between gap-3 bg-amber-50 px-3 sm:px-5 py-4 text-left transition-colors hover:bg-amber-100"
                                        onClick={() => toggleWeek(week.id)}
                                        aria-expanded={isOpen}
                                    >
                                        <div className="flex min-w-0 items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-yelo shadow-sm ring-1 ring-gray-200">
                                                <CalendarDays className="h-4 w-4" />
                                            </div>
                                            <div className="min-w-0">
                                                {week.lecture_name && (
                                                    <span className="mt-0.5 block text-base sm:text-lg text-navy font-bold leading-snug break-words">{week.lecture_name}</span>
                                                )}
                                                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 mt-1">
                                                    <span className="font-medium">Date</span>
                                                    {week.start_date}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-navy shadow-sm ring-1 ring-gray-200">
                                            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <div className="px-3 sm:px-5 pb-4 border-t border-gray-100 pt-3 sm:pt-4">
                                            {week.resources && week.resources.length > 0 ? (
                                                <div className="flex flex-col gap-2 sm:pl-7">
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
