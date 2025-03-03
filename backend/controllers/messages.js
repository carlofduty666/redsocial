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

const Message = require('../models/message')(sequelize, DataTypes);

router.post('/messages', authenticateToken, async (req, res) => {
    const { receiver_id, content } = req.body;
    try {
        const message = await Message.create({
            sender_id: req.user.id,
            receiver_id,
            content,
            is_read: false
        });
        res.status(201).json(message);
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
        res.status(500).send('Error al enviar mensaje');
    }
});

router.get('/messages/:userId', authenticateToken, async (req, res) => {
    try {
        const messages = await Message.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { sender_id: req.user.id, receiver_id: req.params.userId },
                    { sender_id: req.params.userId, receiver_id: req.user.id }
                ]
            },
            order: [['createdAt', 'ASC']]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error al obtener mensajes:', error);
        res.status(500).send('Error al obtener mensajes');
    }
});

module.exports = router;
