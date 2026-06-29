import React from 'react'
import Sidebar from '../../components/Sidebar'

export default function StudentDashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-4">
        This is the Student Dashboard page. You can add your student functionalities here.
      </main>
    </div>
  )
}
