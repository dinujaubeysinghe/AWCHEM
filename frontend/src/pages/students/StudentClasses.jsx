import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axiosClient from '../axiosClient'
import { BookOpen, MapPin, Clock, CalendarDays, LogIn, LogOut } from 'lucide-react'

export default function StudentClasses() {

    const { setNotifications } = useAuth()
    const [myClasses, setMyClasses] = useState([])
    const [availableClasses, setAvailableClasses] = useState([])
    const [loading, setLoading] = useState(false)
    const [enrollingId, setEnrollingId] = useState(null)
    const [unenrollingId, setUnenrollingId] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    const [enrollingClass, setEnrollingClass] = useState(null)
    const [unenrollingClass, setUnenrollingClass] = useState(null)
    const [enrollKey, setEnrollKey] = useState('')
    const [unenrollKey, setUnenrollKey] = useState('')
    const [keyError, setKeyError] = useState('')

    useEffect(() => {
        getAllClasses();
    }, [])

    const getAllClasses = () => {
        setLoading(true);
        Promise.all([
            axiosClient.get('/my/classes'),
            axiosClient.get('/available/classes')
        ])
            .then(([myRes, availableRes]) => {
                setMyClasses(myRes.data.data);
                setAvailableClasses(availableRes.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                setNotifications('Error occurred while fetching classes.');
                console.error('Error fetching classes:', err);
            });
    }

    const handleEnroll = () => {
        if (enrollKey.trim().toLowerCase() !== 'enroll me') {
            setKeyError('Please type "enroll me" exactly to confirm.');
            return;
        }
        setKeyError('');
        axiosClient.post(`/enroll/${enrollingClass.id}`)
            .then(() => {
                setNotifications('Enrolled successfully.');
                setEnrollingClass(null);
                setEnrollKey('');
                getAllClasses();
            })
            .catch((err) => {
                setNotifications('Error occurred while enrolling.');
                setEnrollingClass(null);
                setEnrollKey('');
                console.error('Error enrolling:', err);
            });
    }

    const handleUnenroll = () => {
        if (unenrollKey.trim().toLowerCase() !== 'leave class') {
            setKeyError('Please type "leave class" exactly to confirm.');
            return;
        }
        setKeyError('');
        axiosClient.delete(`/unenroll/${unenrollingClass.id}`)
            .then(() => {
                setNotifications('Unenrolled successfully.');
                setUnenrollingClass(null);
                setUnenrollKey('');
                getAllClasses();
            })
            .catch((err) => {
                setNotifications('Error occurred while unenrolling.');
                setUnenrollingClass(null);
                setUnenrollKey('');
                console.error('Error unenrolling:', err);
            });
    }
    const filteredAvailable = availableClasses.filter((cls) =>
        cls.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.batch?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.location?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const ClassCard = ({ cls, isEnrolled }) => (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
            {/* Card Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${isEnrolled ? 'bg-yelo' : 'bg-navy'} text-white flex items-center justify-center shrink-0`}>
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-navy">{cls.name}</h3>
                        <span className={`text-xs text-white px-2 py-0.5 rounded-full ${isEnrolled ? 'bg-navy' : 'bg-yelo'}`}>
                            {cls.batch}
                        </span>
                    </div>
                </div>
                <span className="text-xs text-gray-400">#{cls.id}</span>
            </div>

            {/* Card Details */}
            <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-yelo shrink-0" />
                    <span>{cls.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarDays className="w-4 h-4 text-yelo shrink-0" />
                    <span>{cls.day}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-yelo shrink-0" />
                    <span>{cls.start_time} — {cls.end_time}</span>
                </div>
            </div>

            {/* Ongoing Unit */}
            {cls.ong_unit && (
                <div className="bg-gray-50 rounded-lg px-3 py-2 mb-4">
                    <p className="text-xs text-gray-500">Ongoing Unit</p>
                    <p className="text-sm text-navy font-medium">{cls.ong_unit}</p>
                </div>
            )}

            {/* Action Button */}
            <div className="pt-3 border-t border-gray-100">
                {isEnrolled ? (
                    <button
                        onClick={() => { setUnenrollingClass(cls); setKeyError(''); }}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-500 hover:text-white rounded-lg transition-colors">
                        <LogOut className="w-3.5 h-3.5" />
                        Unenroll
                    </button>
                ) : (
                    <button
                        onClick={() => { setEnrollingClass(cls); setKeyError(''); }}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-white bg-navy hover:bg-opacity-90 rounded-lg transition-colors">
                        <LogIn className="w-3.5 h-3.5" />
                        Enroll
                    </button>
                )}
            </div>
        </div>
    )

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-navy border-t-yelo rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="p-6">
            <main>
                {/* My Classes Section */}
                <div className="mb-8">
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold text-navy">My Classes</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {myClasses.length} class{myClasses.length !== 1 ? 'es' : ''} enrolled
                        </p>
                    </div>

                    {myClasses.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {myClasses.map((cls) => (
                                <ClassCard key={cls.id} cls={cls} isEnrolled={true} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 text-center py-10 text-gray-400">
                            <BookOpen className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                            <p className="text-sm">You are not enrolled in any classes yet.</p>
                        </div>
                    )}
                </div>

                {/* Available Classes Section */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-navy">Available Classes</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {filteredAvailable.length} class{filteredAvailable.length !== 1 ? 'es' : ''} available
                            </p>
                        </div>
                        <input
                            type="text"
                            placeholder="Search classes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy w-64"
                        />
                    </div>

                    {filteredAvailable.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredAvailable.map((cls) => (
                                <ClassCard key={cls.id} cls={cls} isEnrolled={false} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 text-center py-10 text-gray-400">
                            <BookOpen className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                            <p className="text-sm">No available classes found.</p>
                        </div>
                    )}
                </div>
            </main>
            {/* Enroll Modal */}
            {enrollingClass && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-bold text-navy mb-2">Enroll in Class</h2>
                        <p className="text-sm text-gray-600 mb-1">
                            You are enrolling in{' '}
                            <span className="font-semibold text-navy">{enrollingClass.name}</span>.
                        </p>
                        <p className="text-sm text-gray-600 mb-4">
                            Type <span className="font-semibold text-navy">"enroll me"</span> to confirm.
                        </p>
                        <input
                            type="text"
                            placeholder="enroll me"
                            value={enrollKey}
                            onChange={(e) => { setEnrollKey(e.target.value); setKeyError(''); }}
                            className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm"
                        />
                        {keyError && <p className="text-xs text-red-500 mb-3">{keyError}</p>}
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => { setEnrollingClass(null); setEnrollKey(''); setKeyError(''); }}
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                Cancel
                            </button>
                            <button
                                onClick={handleEnroll}
                                className="px-4 py-2 text-sm font-medium text-white bg-navy hover:bg-opacity-90 rounded-lg transition-colors">
                                Enroll
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Unenroll Modal */}
            {unenrollingClass && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-bold text-navy mb-2">Unenroll from Class</h2>
                        <p className="text-sm text-gray-600 mb-1">
                            You are unenrolling from{' '}
                            <span className="font-semibold text-navy">{unenrollingClass.name}</span>.
                        </p>
                        <p className="text-sm text-gray-600 mb-4">
                            Type <span className="font-semibold text-navy">"leave class"</span> to confirm.
                        </p>
                        <input
                            type="text"
                            placeholder="leave class"
                            value={unenrollKey}
                            onChange={(e) => { setUnenrollKey(e.target.value); setKeyError(''); }}
                            className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy text-sm"
                        />
                        {keyError && <p className="text-xs text-red-500 mb-3">{keyError}</p>}
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => { setUnenrollingClass(null); setUnenrollKey(''); setKeyError(''); }}
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                Cancel
                            </button>
                            <button
                                onClick={handleUnenroll}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors">
                                Unenroll
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}