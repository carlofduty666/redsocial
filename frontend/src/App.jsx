import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import EditProfile from './pages/dashboard'
import Navbar from './components/Navbar'

function App() {
  

  return (
    <>
      <Navbar/>

      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/dashboard" element={<EditProfile />} />
        <Route path="/profile" element={<h1>Profile</h1>} />
        <Route path="/edit-profile" element={<h1>Edit-profile</h1>} />

      </Routes>
    



    </>
  )
}

export default App
