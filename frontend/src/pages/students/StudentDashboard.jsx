import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axiosClient from '../axiosClient'
import { BookOpen, ClipboardList, TrendingUp, Clock, MapPin, CalendarDays, ArrowRight, Globe } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function StudentDashboard() {

  const { user } = useAuth()
  const navigate = useNavigate()
  const { setNotifications } = useAuth()

  const [myClasses, setMyClasses] = useState([])
  const [myQuizzes, setMyQuizzes] = useState([])
  const [myResults, setMyResults] = useState([])
  const [loading, setLoading] = useState(false)
  // Add alongside other useState declarations
  const [doneIds, setDoneIds] = useState(() => {
    try {
      const stored = localStorage.getItem('doneQuizzes')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Add alongside other functions
  const toggleDone = (quizId) => {
    setDoneIds((prev) => {
      const updated = prev.includes(quizId)
        ? prev.filter((id) => id !== quizId)
        : [...prev, quizId]
      localStorage.setItem('doneQuizzes', JSON.stringify(updated))
      return updated
    })
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  const getDashboardData = () => {
    setLoading(true)
    Promise.all([
      axiosClient.get('/my/classes'),
      axiosClient.get('/my/quizzes'),
      axiosClient.get('/my/results'),
    ])
      .then(([classesRes, quizzesRes, resultsRes]) => {
        setLoading(false)
        setMyClasses(Array.isArray(classesRes.data) ? classesRes.data : classesRes.data.data ?? [])
        setMyQuizzes(Array.isArray(quizzesRes.data) ? quizzesRes.data : quizzesRes.data.data ?? [])
        setMyResults(Array.isArray(resultsRes.data) ? resultsRes.data : resultsRes.data.data ?? [])
      })
      .catch((err) => {
        setLoading(false)
        setNotifications('Error occurred while fetching dashboard data.')
        console.error(err)
      })
  }

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

      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy">
          Welcome back, {user?.first_name}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Here's your class activity and upcoming quizzes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column — My Classes + My Results */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* My Classes */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-yelo" />
                <h2 className="text-sm font-bold text-navy">My Classes</h2>
                <span className="text-xs text-gray-400">({myClasses.length})</span>
              </div>
              <button
                onClick={() => navigate('/student/classes')}
                className="flex items-center gap-1 text-xs text-yelo hover:underline"
              >
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {myClasses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                {myClasses.slice(0, 4).map((cls) => (
                  <div
                    key={cls.id}
                    className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-navy text-white flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-navy">{cls.name}</h3>
                        <span className="text-xs text-white bg-yelo px-2 py-0.5 rounded-full">
                          {cls.batch}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <MapPin className="w-3.5 h-3.5 text-yelo" />
                        <span>{cls.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <CalendarDays className="w-3.5 h-3.5 text-yelo" />
                        <span>{cls.day}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5 text-yelo" />
                        <span>{cls.start_time} — {cls.end_time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-400">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">You are not enrolled in any classes yet.</p>
                <button
                  onClick={() => navigate('/student/classes')}
                  className="mt-3 text-xs text-yelo hover:underline"
                >
                  Browse available classes →
                </button>
              </div>
            )}
          </div>

          {/* My Results */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-yelo" />
                <h2 className="text-sm font-bold text-navy">My Results</h2>
                <span className="text-xs text-gray-400">({myResults.length})</span>
              </div>
              <button
                onClick={() => navigate('/student/results')}
                className="flex items-center gap-1 text-xs text-yelo hover:underline"
              >
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {myResults.length > 0 ? (
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider">Quiz</th>
                    <th className="py-3 px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider">Class</th>
                    <th className="py-3 px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider">Date</th>
                    <th className="py-3 px-6 text-left text-xs font-semibold text-navy uppercase tracking-wider">Marks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {myResults.slice(0, 5).map((result) => (
                    <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-6 text-sm font-medium text-navy">{result.quiz_title}</td>
                      <td className="py-3 px-6 text-sm text-gray-600">{result.class_name}</td>
                      <td className="py-3 px-6 text-sm text-gray-600">{result.quiz_date}</td>
                      <td className="py-3 px-6">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${result.marks >= 75 ? 'bg-green-100 text-green-700' :
                          result.marks >= 50 ? 'bg-yellow-100 text-yellow-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                          {result.marks}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-10 text-gray-400">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No results yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column — My Quizzes */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-yelo" />
                <h2 className="text-sm font-bold text-navy">Upcoming Quizzes</h2>
                <span className="text-xs text-gray-400">
                  ({myQuizzes.filter(q => !doneIds.includes(q.id)).length})
                </span>
              </div>
              <button
                onClick={() => navigate('/student/quizzes')}
                className="flex items-center gap-1 text-xs text-yelo hover:underline"
              >
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {myQuizzes.filter(q => !doneIds.includes(q.id)).length > 0 ? (
              <div className="flex flex-col divide-y divide-gray-100">
                {myQuizzes
                  .filter(q => !doneIds.includes(q.id))
                  .slice(0, 6)
                  .map((quiz) => (
                    <div key={quiz.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-sm font-bold text-navy">{quiz.title}</h3>
                        {quiz.type === 'online'
                          ? <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">Online</span>
                          : <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">Physical</span>
                        }
                      </div>
                      <p className="text-xs text-yelo font-medium mb-2">{quiz.class_name}</p>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <CalendarDays className="w-3 h-3 text-yelo" />
                          <span>{quiz.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Clock className="w-3 h-3 text-yelo" />
                          <span>{quiz.duration}</span>
                        </div>
                        {quiz.type === 'physical' && quiz.location && (
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <MapPin className="w-3 h-3 text-yelo" />
                            <span>{quiz.location}</span>
                          </div>
                        )}
                        {quiz.type === 'online' && quiz.quiz_link && (
                          <a
                            href={quiz.quiz_link}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-xs text-blue-500 hover:underline"
                          >
                            <Globe className="w-3 h-3" />
                            Quiz Link
                          </a>
                        )}
                      </div>
                      {/* Mark as done */}
                      <label className="flex items-center gap-2 text-xs font-medium cursor-pointer select-none mt-3 pt-2 border-t border-gray-100">
                        <input
                          type="checkbox"
                          checked={false}
                          onChange={() => toggleDone(quiz.id)}
                          className="w-3.5 h-3.5 accent-green-600 cursor-pointer"
                        />
                        <span className="text-gray-500">Mark as done</span>
                      </label>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-400">
                <ClipboardList className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No upcoming quizzes.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}