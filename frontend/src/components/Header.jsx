import React from 'react'
import axiosClient from '../pages/axiosClient'
import { useAuth } from '../context/AuthContext'
import { User } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Header() {

    const { user } = useAuth()

    return (
        <>
            {user?.is_admin === true && (
                <div className="bg-navy text-white py-4 md:py-6 border-b border-gray-700 rounded-xl shadow-md mx-2 md:mx-4">
                    <div className="flex items-center justify-between gap-2 md:gap-4 px-4 md:px-8">
                        <Link to="/admin/dashboard" 
                        className="text-xl md:text-3xl font-sansala text-white shrink-0 cursor-pointer">
                            wixl <span className="text-yelo font-sansala ">jeÈisxy</span>
                        </Link>
                        <div className="hidden sm:block text-lg md:text-3xl font-bold">
                            Administrator Portal
                        </div>
                        <Link
                            to="/admin/settings"
                            className="flex items-center gap-2 cursor-pointer font-bold text-white shrink-0 text-sm md:text-base"
                        >
                            Hi, {user?.first_name} <User className="w-4 h-4 md:w-5 md:h-5" />
                        </Link>
                    </div>
                </div>
            )}

            {user?.is_admin === false && (
                <div className="bg-navy text-white py-4 md:py-6 border-b border-gray-700 rounded-xl shadow-md mx-2 md:mx-4">
                    <div className="flex items-center justify-between gap-2 md:gap-4 px-4 md:px-8">
                        <Link to="/student/dashboard" className="text-xl md:text-3xl font-sansala text-white shrink-0 cursor-pointer">
                            wixl <span className="text-yelo font-sansala">jeÈisxy</span>
                        </Link>
                        <div className="hidden sm:block text-lg md:text-3xl font-bold">
                            Student Portal
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer font-bold text-white shrink-0">
                            <Link to="https://wa.me/94775782011" target="_blank">
                                <button className="hidden sm:block border border-yelo text-white px-3 md:px-4 py-1 md:py-1.5 rounded-xl hover:bg-yelo transition duration-300 mr-2 md:mr-4 cursor-pointer text-sm md:text-base">
                                    Support
                                </button>
                            </Link>
                            <Link
                                to="/student/settings"
                                className="flex items-center gap-2 cursor-pointer font-bold text-white text-sm md:text-base"
                            >
                                Hi, {user?.first_name} <User className="w-4 h-4 md:w-5 md:h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}