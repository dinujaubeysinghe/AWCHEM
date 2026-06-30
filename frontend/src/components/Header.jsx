import React from 'react'
import axiosClient from '../pages/axiosClient'
import { useAuth } from '../context/AuthContext'
import { User} from 'lucide-react'
import {Link} from 'react-router-dom'

export default function Header() {

    const { user } = useAuth()

    return (
        <>
            {user?.is_admin === true && (
                <div className="bg-gray-800 text-white py-6 border-b border-gray-700 rounded-xl shadow-md ">
                    <div className="flex items-center justify-between gap-4 px-8">
                        <div className="text-3xl font-bold text-white">
                            AWCHEM
                        </div>
                        <div className=" text-3xl font-bold ">
                            Administrator Portal
                        </div>
                        <Link 
                            to="/admin/settings" 
                            className="flex items-center gap-2 cursor-pointer font-bold text-white"
                        >
                            Hi, {user?.first_name} <User className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            )}

            {user?.is_admin === false && (
                <div className="bg-gray-800 text-white py-6 border-b border-gray-700 rounded-xl shadow-md">
                    <div className="flex items-center justify-between gap-4 px-8">
                        <div className="text-3xl font-bold text-white">
                            AWCHEM
                        </div>
                        <div className=" text-3xl font-bold ">
                            Student Portal
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer font-bold text-white">
                            <Link to="https://wa.me/2348134567890" target="_blank">
                                <button className="border border-yelo text-white px-4 py-1.5 rounded-xl hover:bg-yelo transition duration-300 mr-4 cursor-pointer">
                                    Support
                                </button>
                            </Link>
                            <Link 
                            to="/student/settings"
                            className="flex items-center gap-2 cursor-pointer font-bold text-white">
                            Hi, {user?.first_name} <User className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
