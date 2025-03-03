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

const Post = require('../models/post')(sequelize, DataTypes);

router.post('/posts', authenticateToken, async (req, res) => {
    const { content } = req.body;
    try {
        const post = await Post.create({
            userID: req.user.id,
            content
        });
        res.status(201).json(post);
    } catch (error) {
        console.error('Error al crear post:', error);
        res.status(500).send('Error al crear post');
    }
});

router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            include: ['User']
        });
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error al obtener posts:', error);
        res.status(500).send('Error al obtener posts');
    }
});

router.delete('/posts/:id', authenticateToken, async (req, res) => {
    try {
        await Post.destroy({
            where: {
                id: req.params.id,
                userID: req.user.id
            }
        });
        res.status(200).json({ message: 'Post eliminado' });
    } catch (error) {
        console.error('Error al eliminar post:', error);
        res.status(500).send('Error al eliminar post');
    }
});

module.exports = router;
