const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// estas 4 constantes inviolablemente debe estar en todo controlador
const { Sequelize, DataTypes } = require('sequelize');
const dbconfig = require('../config/config.json').development;

const sequelize = new Sequelize(
    dbconfig.database,
    dbconfig.username,
    dbconfig.password, 
    {
        host: dbconfig.host,
        dialect: dbconfig.dialect
    }
);

// esta constante no puede ir antes de la constante sequelize
const User = require('../models/user')(sequelize, DataTypes);

router.get('/', async (request, response) => {
    try {
        const users = await User.findAll(); // se puede usar el metodo getAllUsers() o el predeterminado de Sequelize: findAll()
        response.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        response.status(500).send('Error al obtener usuarios');
    }
});

router.post('/', async (request, response) => {
    const { username, password, email, firstName, lastName, phone, address } = request.body;
    try {
        const nuevoUsuario = await User.create({ username, password, email, firstName, lastName, phone, address }); // create() es un metodo de sequelize que crea un nuevo registro en la base de datos
        response.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        response.status(500).send('Error al crear usuario');
    }
})

router.delete('/', async (request, response) => {
    const { id } = request.body;
    try {
        const usuarioEliminado = await User.destroy({ where: { id } });
        if (usuarioEliminado) {
            response.status(200).json({ message: 'Usuario eliminado exitosamente' });
        } else {
            response.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        response.status(500).send('Error al eliminar usuario');
    }
});

router.post('/register', async (request, response) => {
    try {
        
        const { firstName, lastName, email, password } = request.body;

        const hash = await bcrypt.hash(password, 10);
        
        await User.registerUser({firstName, lastName, email, password: hash});
        return response.status(201).json({ message: 'User created successfully :-)' });
    } catch (error) {
        console.log('Error al registrar usuario:', error);
        return response.status(500).send('Error al registrar usuario');
    }
});

router.post('/login', async (request, response) => {
    const { email, password } = request.body;

    try {
        const user = await User.loginUser(email);
        if (!user) {
            return response.status(401).send('Invalid e-mail');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).send('Invalid password');
        }
        const secret = process.env.JWT_SECRET + user.id
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
        response.cookie('token', token, { httpOnly: true, path: '/' });
        response.status(201).json({ token });
    } catch (error) {
        console.log('Error al iniciar sesion:', error);
    }
});

// router.post('/login', async (request, response) => {
//     const { username, password } = request.body;

//     try {
//         const user = await User.loginUser(username);
//         if (!user) {
//             return response.status(401).send('Username invalido');
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return response.status(401).send('Contraseña invalida');
//         }
//         const token = jwt.sign({ id: user.id }, '123456', { expiresIn: '1h' });
//         response.cookie('token', token, { httpOnly: true, path: '/' });
//         response.status(201).json({ token });
//     } catch (error) {
//         console.log('Error al iniciar sesion:', error);
//     }
// });

// router.post('/register', async (request, response) => {
//     const { username, password } = request.body;

//     try {
//         const hash = await bcrypt.hash(password, 10);
//         await User.registerUser(username, hash);
//         return response.status(201).json({ message: 'Usuario registrado exitosamente' });
//     } catch (error) {
//         console.log('Error al registrar usuario:', error);
//         return response.status(500).send('Error al registrar usuario');
//     }
// });

// router.post('/forgot-passwordd', (request, response) => {
//     const { username } = request.body;
//     const token = jwt.sign({ username }, '123456', { expiresIn: '1h' });
//     const resetLink = `http://localhost:3000/reset-password?token=${token}`;
//     console.log('Link de restablecimiento de contraseña:', resetLink);
//     response.status(200).json({ message: 'Link de restablecimiento de contraseña enviado al correo electronico' });
    

// })

// router.post('/change-password', async (request, response) => {
//     const { id, currentPassword, newPassword } = request.body;

//     try {
//         const user = await User.findByPk(id); // findByPk es un metodo de sequelize para buscar un usuario por su id
//         if (!user) {
//             return response.status(404).send('Usuario no encontrado');
//         }

//         const isMatch = await bcrypt.compare(currentPassword, user.password);
//         if (!isMatch) {
//             return response.status(401).send('Contraseña actual invalida');
//         }

//         const hash = await bcrypt.hash(newPassword, 10); // el 10 es el numero de veces que se va a encriptar la contraseña
//         await user.update({ password: hash }); //update es un metodo de sequelize para actualizar un usuario

//         return response.status(200).json({ message: 'Contraseña actualizada exitosamente' });
//     } catch (error) {
//         console.log('Error al cambiar la contraseña:', error);
//         return response.status(500).send('Error al cambiar la contraseña');
//     }

// });

// router.post('/edit-profile', async (request, response) => {
//     const { userId, profileData } = request.body; // userId es el id del usuario que se va a editar, profileData es el objeto con los datos del usuario que se va a editar

//     User.findByPk(userId, (error, user) => {
//         if (error) {
//             return response.status(500).json({ message: 'Error al obtener el usuario' });
//         }
//         if (!user) {
//             return response.status(404).json({ message: 'Usuario no encontrado' });
//         }

//         User.editProfile(userId, profileData, (error, updatedUser) => {
//             if (error) {
//                 return response.status(500).json({ message: 'Error al editar el perfil' });
//             }
//             return response.status(200).json({ message: 'Perfil actualizado exitosamente' });
//         });
//     })

// })

// router.post('/logout', async (request, response) => {
//     try {
//         response.clearCookie('token');
//         return response.status(200).json({ message: 'Sesion cerrada exitosamente' });
//     } catch (error) {
//         return response.status(500).send('Error al cerrar sesion');
//     }
// });

module.exports = router;
