const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dbconfig = require('./config/config.json').development;
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5556'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// app.use(cors())
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5556;
const host = process.env.HOST || 'localhost';

// Controllers
const userController = require('./controllers/user');
// app.use('/users', userController);
app.use('/auth', userController);
app.use('/', userController);


// Middelewares
// const authenticateToken = require('./middleware/auth');
// const upload = require('./middleware/uploads');



// 


// Configuración de la carpeta de archivos estáticos
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'uploads')));
// app.set('view engine', 'ejs');

// Rutas 'upload' de archivos
// app.get('/', authenticateToken, (req, res) => {
//     res.render('file')
// });

// app.post('file-upload', upload.single('file'), async (req, res) => {
//     const { username, password, email, firstName, lastName, phone, address, rol } = request.body;
//     try {
//         const newUser = await User.create({ username, password, email, firstName, lastName, phone, address, rol: "user" }); // create() es un metodo de sequelize que crea un nuevo registro en la base de datos
//         response.status(201).json({ message: 'Usuario creado exitosamente' });
//     } catch (error) {
//         console.error('Error al crear usuario:', error);
//         response.status(500).send('Error al crear usuario');
//     }
//     console.log(req.file.originalname);
//     res.status(202).send('Archivo subido!');
// })


// Middleware de autenticación global
app.use((req, res, next) => {
    if (req.cookies && req.cookies.token) {
        try {
            const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
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
