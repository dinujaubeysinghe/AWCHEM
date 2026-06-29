import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import Signup from './pages/Signup'

//Admin Links
import Students from './pages/admin/Students'
import AdminDashboard from './pages/admin/AdminDashboard'

//Student Links
import StudentDashboard from './pages/students/StudentDashboard'

import { useAuth } from './context/AuthContext'

function ProtectedRoute({ children }) {
  const { token } = useAuth()
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/student/dashboard' element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
        <Route path='/admin/dashboard' element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path='/admin/students' element={<ProtectedRoute><Students /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
