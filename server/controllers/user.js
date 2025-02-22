const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (request, response) => {
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
router.post('/register', async (request, response) => {
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

router.post('/forgot-passwordd', (request, response) => {
    // const { username } = request.body;
    // const token = jwt.sign({ username }, '123456', { expiresIn: '1h' });
    // const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    // console.log('Link de restablecimiento de contraseña:', resetLink);
    // response.status(200).json({ message: 'Link de restablecimiento de contraseña enviado al correo electronico' });
    

})

router.post('/change-password', async (request, response) => {
    const { id, currentPassword, newPassword } = request.body;

    try {
        const user = await User.findByPk(id); // findByPk es un metodo de sequelize para buscar un usuario por su id
        if (!user) {
            return response.status(404).send('Usuario no encontrado');
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return response.status(401).send('Contraseña actual invalida');
        }

        const hash = await bcrypt.hash(newPassword, 10); // el 10 es el numero de veces que se va a encriptar la contraseña
        await user.update({ password: hash }); //update es un metodo de sequelize para actualizar un usuario

        return response.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        console.log('Error al cambiar la contraseña:', error);
        return response.status(500).send('Error al cambiar la contraseña');
    }

});

router.post('/edit-profile', async (request, response) => {
    const { userId, profileData } = request.body; // userId es el id del usuario que se va a editar, profileData es el objeto con los datos del usuario que se va a editar

    User.findByPk(userId, (error, user) => {
        if (error) {
            return response.status(500).json({ message: 'Error al obtener el usuario' });
        }
        if (!user) {
            return response.status(404).json({ message: 'Usuario no encontrado' });
        }

        User.editProfile(userId, profileData, (error, updatedUser) => {
            if (error) {
                return response.status(500).json({ message: 'Error al editar el perfil' });
            }
            return response.status(200).json({ message: 'Perfil actualizado exitosamente' });
        });
    })

})

router.post('/logout', async (request, response) => {
    try {
        response.clearCookie('token');
        return response.status(200).json({ message: 'Sesion cerrada exitosamente' });
    } catch (error) {
        return response.status(500).send('Error al cerrar sesion');
    }
});

module.exports = router;

// router.post('/login', (request, response) => {
//     const { username, password } = request.bodoy;
    
//     console.log('Login attempt for username:', username);

//     User.loginUser(username, (error, result) => {
//         console.log('Database result:', result);
//         if (error) {
//             console.log('Error al iniciar sesion:', error);
//             response.status(500).send('Error al iniciar sesion')
//             return;
//         }
//         if (result.length === 0) {
//             response.status(401).send('Usuario no encontrado');
//             return;
//         }
//         const user = result[0];

//         bcrypt.compare(password, user.password, (error, isMatch) => {
//             console.log('Comparing passwords:');
//             console.log('Provided password:', password);
//             console.log('Stored hash:', user.password);
//             console.log('Match result:', isMatch);
//             if (error) {
//                 console.log('Error comparing passwords:', error);
//                 response.status(500).send('Error al iniciar sesion');
//                 return;
//             }
//             if (!isMatch) {
//                 response.status(401).send('Contraseña incorrecta');
//                 return;
//             }
//             const token = jwt.sign({ id: user.id }, '123456', { expiresIn: '1h' });
//             console.log('Token generated:', token);
//             response.cookie('token', token, { httpOnly: true, path: '/' });
//             response.status(201).json({ token });
//             // response.json({ token });
//         })
//     })

// });

// router.post('/register', (request, response) => {
//     const { username, password } = request.body;

//     bcrypt.hash(password, 10, (error, hash) => {
//         if (error) {
//             console.log('Error al hashear la contraseña:', error);
//             response.status(500).send('Error al registrar usuario');
//             return;
//         }
//         User.createUser(username, (error, result) => {
//             if (error) {
//                 console.log('Error al registrar usuario:', error);
//                 response.status(500).send('Error al registrar usuario');
//                 return;
//             }
//             response.status(201).json({ message: 'Usuario registrado exitosamente' });
//         })
//     })

// })
