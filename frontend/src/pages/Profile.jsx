import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token'); // Recupera el token guardado

                const response = await fetch('http://localhost:5556/users/profile', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`, // Envía el token en el encabezado Authorization
                    },
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los datos del perfil');
                }

                const data = await response.json();
                setUserData(data); // Guarda los datos del usuario en el estado
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Perfil de Usuario</h1>
            <p><strong>Nombre:</strong> {userData.firstName} {userData.lastName}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Teléfono:</strong> {userData.phone}</p>
            <p><strong>Dirección:</strong> {userData.address}</p>
            {/* Agrega más campos según sea necesario */}
        </div>
    );
};

export default Profile;
