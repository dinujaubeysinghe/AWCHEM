import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import HomePage from './pages/HomePage'

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
