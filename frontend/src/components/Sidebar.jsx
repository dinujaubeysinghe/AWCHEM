import React from 'react'
import axiosClient from '../pages/axiosClient'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { LayoutDashboard, Users, BookOpen, ClipboardList, TrendingUp, LogOut, Settings } from 'lucide-react'

export default function Sidebar() {

    const { user, setUser } = useAuth();
    const { pathname } = useLocation();

    const isActive = (path) => pathname === path;

    useEffect(() => {
        // Fetch user data from the backend when the component mounts
        axiosClient.get('/user')
            .then(({ data }) => {
                console.log('User data fetched:', data);
                setUser(data);
            })
            .catch((err) => {
                console.error('Error occurred while fetching user data:', err);
            });
    }, []);

    const adminLinks = [
        { icon: <LayoutDashboard className='w-5 h-5' />, name: 'Dashboard', path: '/admin/dashboard' },
        { icon: <Users className='w-5 h-5' />, name: 'Students', path: '/admin/students' },
        { icon: <BookOpen className='w-5 h-5' />, name: 'Classes', path: '/admin/courses' },
        { icon: <ClipboardList className='w-5 h-5' />, name: 'Quizzes', path: '/admin/quizzes' },
        { icon: <TrendingUp className='w-5 h-5' />, name: 'Results', path: '/admin/results' },
    ];

    const studentLinks = [
        { icon: <LayoutDashboard className='w-5 h-5' />, name: 'Dashboard', path: '/student/dashboard' },
        { icon: <BookOpen className='w-5 h-5' />, name: 'My Classes', path: '/student/courses' },
        { icon: <ClipboardList className='w-5 h-5' />, name: 'My Quizzes', path: '/student/quizzes' },
        { icon: <TrendingUp className='w-5 h-5' />, name: 'My Results', path: '/student/results' },
    ];

    const commonLinks = [
        { icon: <Settings className='w-5 h-5' />, name: 'Settings', path: `${user?.is_admin ? '/admin/settings' : '/student/settings'}` },
        { icon: <LogOut className='w-5 h-5' />, name: 'Logout', path: '/logout' },
    ];

    return (
        <>
            {user?.is_admin === true && (
                <div className="h-screen w-68 bg-navy flex flex-col">
                    <div className="flex items-center justify-around px-8 border-b border-b-[#E2E6EE]">
                        <div className=" w-15 h-15 rounded-full overflow-hidden bg-yelo mt-6 mb-4 text-center text-3xl font-bold  text-white pt-2.5">
                            {user?.first_name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col justify-center items-center text-3xl font-bold pt-5 mb-4 text-white ">
                            {user?.first_name}
                            <div className="text-xs font-normal text-white">
                                Admin
                            </div>
                        </div>
                    </div>
                    <ul className="mt-4 px-3">
                        {adminLinks.map((link) => (
                            <li
                                key={link.name}
                                className={`px-3 py-2 text-yelo cursor-pointer rounded-lg mb-1 transition-colors duration-150
                                    ${isActive(link.path) ? 'bg-yelo/19' : ''}`}
                            >
                                <Link className="flex items-center" to={link.path}>
                                    {link.icon}
                                    <span className="ml-2">{link.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-auto">
                        <ul>
                            <li className={`px-3 py-2 text-yelo cursor-pointer rounded-lg mb-1 transition-colors duration-150
                                ${isActive('/admin/settings') ? 'bg-yelo/19' : ''}`}>
                                <Link className="flex items-center" to="/admin/settings">
                                    <Settings className="w-5 h-5" />
                                    <span className="ml-2">Settings</span>
                                </Link>
                            </li>
                            <li className="px-6 py-2 text-red-400 cursor-pointer border-t border-t-[#E2E6EE]/20 mb-2">
                                <Link className="flex items-center" to="/logout">
                                    <LogOut className="w-5 h-5" />
                                    <span className="ml-2">Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {user?.is_admin === false && (
                <div className="h-screen w-68 bg-[#E2E6EE] flex flex-col">
                    <div className="flex items-center justify-around px-8 border-b border-b-navy/20">
                        <div className=" w-15 h-15 rounded-full overflow-hidden bg-navy mt-6 mb-4 text-center text-3xl font-bold  text-white pt-2.5">
                            {user?.first_name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col justify-center items-center text-xl font-bold pt-5 mb-4 text-navy">
                            {user?.first_name}
                            <div className="text-xs font-normal text-navy">
                                Student
                            </div>
                        </div>
                    </div>
                    <ul className="mt-4 px-3">
                        {studentLinks.map((link) => (
                            <li
                                key={link.name}
                                className={`px-3 py-2 text-navy cursor-pointer rounded-lg mb-1 transition-colors duration-150
                                    ${isActive(link.path) ? 'bg-navy && text-yelo' : ''}`}
                            >
                                <Link className="flex items-center" to={link.path}>
                                    {link.icon}
                                    <span className="ml-2">{link.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-auto">
                        <ul>
                            <li className={`px-3 py-2 text-navy cursor-pointer rounded-lg mb-1 transition-colors duration-150
                                ${isActive('/student/settings') ? 'bg-navy' : ''}`}>
                                <Link className="flex items-center" to="/student/settings">
                                    <Settings className="w-5 h-5" />
                                    <span className="ml-2">Settings</span>
                                </Link>
                            </li>
                            <li className="px-6 py-2 text-red-500 cursor-pointer border-t border-t-navy/20 mb-2">
                                <Link className="flex items-center" to="/logout">
                                    <LogOut className="w-5 h-5" />
                                    <span className="ml-2">Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}
