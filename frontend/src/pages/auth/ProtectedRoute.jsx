import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Verifica si hay un token guardado

    return token ? children : <Navigate to="/auth/login" />; // Si no hay token, redirige a /auth/login
};

export default ProtectedRoute;
