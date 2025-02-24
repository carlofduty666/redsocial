const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dbconfig = require('./config/config.json').development;
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

// Middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Middleware de autenticación global
app.use((req, res, next) => {
    if (req.cookies && req.cookies.token) {
        try {
            const decoded = jwt.verify(req.cookies.token, '123456');
            req.user = decoded;
        } catch (err) {
            console.error('Error de autenticación:', err);
        }
    }
    next();
});


// Base route
app.get('/', (req, res) => {
    res.json({ message: 'API funcionando correctamente' });
});


const userController = require('./controllers/user');
app.use('/users', userController);
app.use('/auth', userController);


// Database initialization
const sequelize = new Sequelize(
    dbconfig.database,
    dbconfig.username,
    dbconfig.password, 
    {
        host: dbconfig.host,
        dialect: dbconfig.dialect
    }
);

// Models import
const User = require('./models/user')(sequelize, DataTypes);
const Profile = require('./models/profile')(sequelize, DataTypes);

// Associations
User.hasOne(Profile);
Profile.belongsTo(User);

// Routes

// Database sync
sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
}).catch((error) => {
    console.error('Error creating database:', error);
});


// Server start
app.listen(port, () => {
    console.log(`Server is running on port ${host}:${port}`);
});
