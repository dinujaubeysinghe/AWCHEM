import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import Signup from './pages/Signup'

// Layouts
import AdminLayout from './layouts/AdminLayout'
import StudentLayout from './layouts/StudentLayout'

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard'
import Students from './pages/admin/Students'
import AdminClasses from './pages/admin/AdminClasses'
import AdminCreateClasses from './pages/admin/AdminCreateClasses'
import AdminEditClasses from './pages/admin/AdminEditClasses'

// Student pages
import StudentDashboard from './pages/students/StudentDashboard'
import StudentClasses from './pages/students/StudentClasses'

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

        {/* Admin routes — Sidebar rendered once in AdminLayout */}
        <Route path='/admin' element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='students' element={<Students />} />
          <Route path='classes' element={<AdminClasses />} />
          <Route path='classes/create' element={<AdminCreateClasses />} />
          <Route path='classes/edit/:id' element={<AdminEditClasses />} />
        </Route>

        {/* Student routes — Sidebar rendered once in StudentLayout */}
        <Route path='/student' element={<ProtectedRoute><StudentLayout /></ProtectedRoute>}>
          <Route path='dashboard' element={<StudentDashboard />} />
          <Route path='classes' element={<StudentClasses />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
