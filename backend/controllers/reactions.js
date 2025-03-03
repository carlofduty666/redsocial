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

const Reaction = require('../models/reactions')(sequelize, DataTypes);

router.post('/reactions', authenticateToken, async (req, res) => {
    const { post_id, type } = req.body;
    try {
        const reaction = await Reaction.create({
            userID: req.user.id,
            post_id,
            type
        });
        res.status(201).json(reaction);
    } catch (error) {
        console.error('Error al crear reacción:', error);
        res.status(500).send('Error al crear reacción');
    }
});

router.delete('/reactions/:id', authenticateToken, async (req, res) => {
    try {
        await Reaction.destroy({
            where: {
                id: req.params.id,
                userID: req.user.id
            }
        });
        res.status(200).json({ message: 'Reacción eliminada' });
    } catch (error) {
        console.error('Error al eliminar reacción:', error);
        res.status(500).send('Error al eliminar reacción');
    }
});

module.exports = router;
