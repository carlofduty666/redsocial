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

const Comment = require('../models/comments')(sequelize, DataTypes);

router.post('/comments', authenticateToken, async (req, res) => {
    const { post_id, content } = req.body;
    try {
        const comment = await Comment.create({
            userID: req.user.id,
            post_id,
            content
        });
        res.status(201).json(comment);
    } catch (error) {
        console.error('Error al crear comentario:', error);
        res.status(500).send('Error al crear comentario');
    }
});

router.get('/posts/:postId/comments', async (req, res) => {
    try {
        const comments = await Comment.findAll({
            where: { post_id: req.params.postId },
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).send('Error al obtener comentarios');
    }
});

module.exports = router;