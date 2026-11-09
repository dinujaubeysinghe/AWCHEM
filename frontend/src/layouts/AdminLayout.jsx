import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'

export default function AdminLayout() {

    const { notifications } = useAuth()

    return (
        <>
            <div className="flex h-dvh overflow-hidden">
                <Sidebar />
                <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden flex flex-col">
                    <div className="sticky top-0 z-30 bg-white">
                        <Header />
                    </div>
                    <div className="flex-1 min-w-0">
                        <Outlet />
                    </div>
                    <Footer />
                </main>
            </div>
            {notifications && (
                <div
                    className="fixed top-6 right-6 max-w-[calc(100vw-3rem)] px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white bg-yelo z-50"
                    role="status"
                    aria-live="polite"
                >
                    {notifications}
                </div>
            )}
        </>
    )
}