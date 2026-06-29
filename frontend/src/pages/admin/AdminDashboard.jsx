import React from 'react'
import Sidebar from '../../components/Sidebar'

export default function AdminDashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-4 overflow-auto">
        This is the Admin Dashboard page. You can add your admin functionalities here.
      </main>
    </div>
  )
}
