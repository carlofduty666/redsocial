const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó ningún token.' });
    }

    try {
        const secret = process.env.JWT_SECRET + req.user.id; // Combina la clave secreta fija con el ID del usuario
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Error de autenticación:', err);
        return res.status(403).json({ message: 'Token no válido o expirado.' });
    }
};

module.exports = authenticateToken;