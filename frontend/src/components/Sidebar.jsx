import React from 'react'
import axiosClient from '../pages/axiosClient'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, BookOpen, ClipboardList, TrendingUp, LogOut } from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {

    const { user, setUser, setToken } = useAuth();
    const navigate = useNavigate();
    const { pathname } = useLocation();
       const [loggingOut, setLoggingOut] = useState(false)
       const [showLogoutModal, setShowLogoutModal] = useState(false)

    const isActive = (path) => pathname === path;

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data);
            })
            .catch((err) => {
                console.error('Error occurred while fetching user data:', err);
            });
    }, []);

    const adminLinks = [
        { icon: <LayoutDashboard className='w-5 h-5' />, name: 'Dashboard', path: '/admin/dashboard' },
        { icon: <Users className='w-5 h-5' />, name: 'Students', path: '/admin/students' },
        { icon: <BookOpen className='w-5 h-5' />, name: 'Classes', path: '/admin/classes' },
        { icon: <ClipboardList className='w-5 h-5' />, name: 'Quizzes', path: '/admin/quizzes' },
        { icon: <TrendingUp className='w-5 h-5' />, name: 'Results', path: '/admin/results' },
    ];

    const studentLinks = [
        { icon: <LayoutDashboard className='w-5 h-5' />, name: 'Dashboard', path: '/student/dashboard' },
        { icon: <BookOpen className='w-5 h-5' />, name: 'My Classes', path: '/student/classes' },
        { icon: <ClipboardList className='w-5 h-5' />, name: 'My Quizzes', path: '/student/quizzes' },
        { icon: <TrendingUp className='w-5 h-5' />, name: 'My Results', path: '/student/results' },
    ];

    const onLogout = () => {
        setLoggingOut(true);
        axiosClient.post('/logout')
            .then(() => {
                setLoggingOut(false);
                setToken(null);
                setUser({});
                navigate('/login');
            })
            .catch((err) => {
                setLoggingOut(false);
                console.error('Error occurred while logging out:', err);
            });
    };

    return (
        <>
            {user?.is_admin === true && (
                <div className="h-screen w-16 md:w-56 lg:w-68 bg-navy flex flex-col border-r border-r-gra/20 transition-all duration-300">
                    <div className="flex items-center justify-center md:justify-around px-2 md:px-8 border-b border-b-gra/20">
                        <div className="w-10 h-10 md:w-15 md:h-15 rounded-full overflow-hidden bg-yelo mt-4 mb-3 md:mt-6 md:mb-4 text-center text-xl md:text-3xl font-bold text-white pt-1.5 md:pt-2.5 shrink-0">
                            {user?.first_name.charAt(0).toUpperCase()}
                        </div>
                        <div className="hidden md:flex flex-col justify-center items-center text-xl lg:text-3xl font-bold pt-5 mb-4 text-white">
                            {user?.first_name}
                            <div className="text-sm font-normal text-white">
                                {user?.last_name}
                            </div>
                        </div>
                    </div>
                    <ul className="mt-4 px-2 md:px-3">
                        {adminLinks.map((link) => (
                            <li
                                key={link.name}
                                className={`px-2 md:px-3 py-2 text-yelo cursor-pointer rounded-lg mb-1 transition-colors duration-150
                                    ${isActive(link.path) ? 'bg-yelo/19' : ''}`}
                            >
                                <Link className="flex items-center justify-center md:justify-start" to={link.path}>
                                    {link.icon}
                                    <span className="hidden md:block ml-2">{link.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-auto">
                        <ul>
                            <li className="border-t border-t-gra/20 mt-1 mb-2">
                                <button
                                    onClick={() => setShowLogoutModal(true)}
                                    className="flex items-center justify-center md:justify-start w-full px-2 md:px-3 py-2 text-red-400 cursor-pointer rounded-lg transition-colors duration-150"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span className="hidden md:block ml-2">Logout</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {user?.is_admin === false && (
                <div className="h-screen w-16 md:w-56 lg:w-68 bg-gra flex flex-col border-r border-r-gra/20 transition-all duration-300">
                    <div className="flex items-center justify-center md:justify-center gap-0 md:gap-4 px-2 md:px-8 border-b border-b-navy/20">
                        <div className="w-10 h-10 md:w-15 md:h-15 rounded-full overflow-hidden bg-navy mt-4 mb-3 md:mt-6 md:mb-4 text-center text-xl md:text-3xl font-bold text-white pt-1.5 md:pt-2.5 shrink-0">
                            {user?.first_name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="hidden md:flex flex-col justify-center items-center text-2xl lg:text-3xl font-bold pt-5 mb-4 text-navy">
                            {user?.first_name}
                            <div className="text-xs font-normal text-navy">
                                {user?.last_name}
                            </div>
                        </div>
                    </div>
                    <ul className="mt-4 px-2 md:px-3">
                        {studentLinks.map((link) => (
                            <li
                                key={link.name}
                                className={`px-2 md:px-3 py-2 text-navy cursor-pointer rounded-lg mb-1 transition-colors duration-150
                                    ${isActive(link.path) ? 'bg-navy/10' : ''}`}
                            >
                                <Link className="flex items-center justify-center md:justify-start" to={link.path}>
                                    {link.icon}
                                    <span className="hidden md:block ml-2">{link.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-auto">
                        <ul>
                            <li className="border-t border-t-navy/20 mt-1 mb-2">
                                <button
                                    onClick={() => setShowLogoutModal(true)}
                                    className="flex items-center justify-center md:justify-start w-full px-2 md:px-3 py-2 text-red-500 cursor-pointer rounded-lg transition-colors duration-150"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span className="hidden md:block ml-2">Logout</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                                <LogOut className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-bold text-navy">Logout</h2>
                        </div>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to log out of your account?
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                disabled={loggingOut}
                                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onLogout}
                                disabled={loggingOut}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {loggingOut ? 'Logging out...' : 'Logout'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}