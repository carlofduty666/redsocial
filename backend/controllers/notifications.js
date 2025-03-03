const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
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

const Notification = require('../models/notification')(sequelize, DataTypes);

router.get('/notifications', authenticateToken, async (req, res) => {
    try {
        const notifications = await Notification.findAll({
            where: { user_id: req.user.id },
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        res.status(500).send('Error al obtener notificaciones');
    }
});

router.put('/notifications/:id', authenticateToken, async (req, res) => {
    try {
        const notification = await Notification.update(
            { is_read: true },
            { where: { id: req.params.id, user_id: req.user.id } }
        );
        res.status(200).json({ message: 'Notificación actualizada' });
    } catch (error) {
        console.error('Error al actualizar notificación:', error);
        res.status(500).send('Error al actualizar notificación');
    }
});

module.exports = router;
