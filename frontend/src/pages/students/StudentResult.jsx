import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axiosClient from '../axiosClient'
import { TrendingUp, Award, Target, BookOpen, Search } from 'lucide-react'

export default function StudentResult() {

    const { setNotifications } = useAuth()
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [classFilter, setClassFilter] = useState('')

    useEffect(() => {
        getMyResults()
    }, [])

    const getMyResults = () => {
        setLoading(true)
        axiosClient.get('/my/results')
            .then(({ data }) => {
                setLoading(false)
                setResults(Array.isArray(data) ? data : data.data ?? [])
            })
            .catch((err) => {
                setLoading(false)
                setNotifications('Error occurred while fetching your results.')
                console.error(err)
            })
            .finally(() => setLoading(false))
    }

    // Unique class names for the filter dropdown
    const classes = useMemo(() => {
        return [...new Set(results.map((r) => r.class_name).filter(Boolean))]
    }, [results])

    // Filtered results based on search + class filter
    const filteredResults = useMemo(() => {
        return results.filter((r) => {
            const matchesSearch =
                !search ||
                r.quiz_title?.toLowerCase().includes(search.toLowerCase()) ||
                r.class_name?.toLowerCase().includes(search.toLowerCase())
            const matchesClass = !classFilter || r.class_name === classFilter
            return matchesSearch && matchesClass
        })
    }, [results, search, classFilter])

    // Summary stats
    const stats = useMemo(() => {
        if (results.length === 0) {
            return { total: 0, average: 0, best: 0, passRate: 0 }
        }
        const marks = results.map((r) => Number(r.marks) || 0)
        const total = results.length
        const best = Math.max(...marks)
        const passed = marks.filter((m) => m >= 40).length
        const passRate = Math.round((passed / total) * 100)
        return { total, best, passRate }
    }, [results])

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-navy border-t-yelo rounded-full animate-spin"></div>
            </div>
        )
    }

    const markBadge = (marks) =>
        marks >= 65 ? 'bg-green-100 text-green-700' :
            marks >= 40 ? 'bg-yellow-100 text-yellow-600' :
                'bg-red-100 text-red-600'

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-navy">My Results</h1>
                <p className="text-sm text-gray-500 mt-1">View your quiz results and performance</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <StatCard
                    icon={<BookOpen className="w-5 h-5 text-white" />}
                    label="Total Quizzes"
                    value={stats.total}
                    tone="bg-navy"
                />
                <StatCard
                    icon={<Award className="w-5 h-5 text-white" />}
                    label="Best Score"
                    value={`${stats.best}%`}
                    tone="bg-navy"
                />
                <StatCard
                    icon={<TrendingUp className="w-5 h-5 text-white" />}
                    label="Pass Rate"
                    value={`${stats.passRate}%`}
                    tone="bg-navy"
                />
            </div>

            {/* Filters */}
         
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by quiz or class..."
                            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                        />
                    </div>
                    <select
                        value={classFilter}
                        onChange={(e) => setClassFilter(e.target.value)}
                        className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy w-full sm:max-w-xs"
                    >
                        <option value="">All Classes</option>
                        {classes.map((name) => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>
                </div>

            {/* Results Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-yelo" />
                        <h2 className="text-sm font-bold text-navy">Quiz Results</h2>
                        <span className="text-xs text-gray-400">({filteredResults.length})</span>
                    </div>
                </div>

                {filteredResults.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="py-3 px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider">Quiz</th>
                                    <th className="py-3 px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider">Class</th>
                                    <th className="py-3 px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider">Date</th>
                                    <th className="py-3 px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider">Marks</th>
                                    <th className="py-3 px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider">Result</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredResults.map((result) => (
                                    <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-3 px-6 text-sm font-medium text-gray-900">{result.quiz_title}</td>
                                        <td className="py-3 px-6 text-sm text-gray-600">{result.class_name}</td>
                                        <td className="py-3 px-6 text-sm text-gray-600">{result.quiz_date}</td>
                                        <td className="py-3 px-6">
                                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${markBadge(result.marks)}`}>
                                                {result.marks}%
                                            </span>
                                        </td>
                                        <td className="py-3 px-6">
                                            <span className={`text-xs font-semibold ${result.marks >= 65 ? 'text-green-600' : result.marks >= 40 ? 'text-yellow-600' : 'text-red-600'
                                                }`}>
                                                {result.marks >= 65 ? 'Excellent' : result.marks >= 40 ? 'Pass' : 'Weak'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-400">
                        <TrendingUp className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                        <p className="text-sm">
                            {results.length === 0
                                ? 'No results available yet.'
                                : 'No results match your filters.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

/* Reusable stat card */
function StatCard({ icon, label, value, tone }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${tone}`}>
                {icon}
            </div>
            <div>
                <p className="text-xs text-gray-500 font-medium">{label}</p>
                <p className="text-xl font-bold text-navy">{value}</p>
            </div>
        </div>
    )
}