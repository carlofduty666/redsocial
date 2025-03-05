// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { useAuth } from './authContext'; // Ajusta según tu contexto de autenticación

// const LogOutButton = ({ text = '', color }) => {
//   const location = useLocation();
//   const { user, logOut: handleLogOut } = useAuth(); // Ajusta según tu contexto de autenticación

//   const isProtectedRoute = location.pathname === '/dashboard' || location.pathname === '/profile';
//   const isLoggedIn = user !== null; // Ajusta según tu lógica de autenticación

//   if (!isLoggedIn || !isProtectedRoute) {
//     return null; // No muestra el botón si no está en una ruta protegida o no está logueado
//   }

//   return (
//     <button
//       className={`btn btn-outline-${color || 'success'}`}
//       type="button"
//       onClick={handleLogOut}
//     >
//       Logout
//     </button>
//   );
// };

// export default LogOutButton;
