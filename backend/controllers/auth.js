const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/auth/login', async (request, response) => {
    const { username, password } = request.body;

    try {
        const user = await User.loginUser(username);
        if (!user) {
            return response.status(401).send('Username invalido');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).send('Contraseña invalida');
        }
        const token = jwt.sign({ id: user.id }, '123456', { expiresIn: '1h' });
        response.cookie('token', token, { httpOnly: true, path: '/' });
        response.status(201).json({ token });
    } catch (error) {
        console.log('Error al iniciar sesion:', error);
    }
});
router.post('/auth/register', async (request, response) => {
    const { username, password } = request.body;

    try {
        const hash = await bcrypt.hash(password, 10);
        await User.registerUser(username, hash);
        return response.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.log('Error al registrar usuario:', error);
        return response.status(500).send('Error al registrar usuario');
    }
});

module.exports = router;