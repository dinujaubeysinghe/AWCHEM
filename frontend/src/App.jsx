import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import Signup from './pages/Signup'

import StudentDashboard from './pages/students/StudentDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/student/dashboard' element={<StudentDashboard />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
      </Routes>
    </>
  )
}

export default App
