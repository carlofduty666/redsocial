const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    let token;

    // Primero, intenta obtener el token del encabezado Authorization
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1];
    } else {
        // Si no está en el encabezado, intenta obtenerlo de una cookie
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateToken;
