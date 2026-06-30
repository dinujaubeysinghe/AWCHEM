import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function AdminLayout() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-auto">
                <Header />
                <Outlet />
                <Footer />
            </main>
        </div>
    )
}
