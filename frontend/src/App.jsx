import { Routes, Route } from 'react-router-dom';
import './App.css';
import { useLocation } from 'react-router-dom';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './pages/auth/ProtectedRoute';
import Profile from './pages/Profile';
import Dashboard from './pages/dashboard';
import Navbar from './components/Navbar';

function App() {

  const location = useLocation();
  const visibleNavBar = !location.pathname.includes('/auth');

  return (
    <>
      {visibleNavBar && <Navbar />}

      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default App;
