import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Navbar from './components/Navbar'

function App() {
  

  return (
    <>
      <Navbar/>

      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

      </Routes>
    



    </>
  )
}

export default App
