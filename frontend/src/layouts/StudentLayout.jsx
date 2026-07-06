import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'

export default function StudentLayout() {

    const { notifications } = useAuth();

    return (
        <>
            <div className="flex h-screen">
                <Sidebar />
                <main className="flex-1 overflow-auto">
                    <Header />
                    <Outlet className="h-full" />
                    <Footer />
                </main>
            </div>
            {notifications && (
                <div
                    className="fixed top-6 right-6 px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white bg-yelo z-50"
                    role="status"
                    aria-live="polite"
                >
                    {notifications}
                </div>
            )}
        </>
    )
}
