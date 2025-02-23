// // Import both models
// const User = require('./models/user')(sequelize, DataTypes);
// const Profile = require('./models/profile')(sequelize, DataTypes);

// // Define their association
// User.hasOne(Profile);
// Profile.belongsTo(User);

// // Sync all models
// sequelize.sync({ force: true }).then(() => {
//     console.log('All tables created successfully!');
// }).catch((error) => {
//     console.error('Error creating tables:', error);
// });
// const express = require('express');
// const { Sequelize, DataTypes } = require('sequelize');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const dbconfig = require('./config/config.json').development
// const cookieParser = require('cookie-parser');

// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 3000;
// const host = process.env.HOST || 'localhost';

// // User.hasOne(Profile);
// // Profile.belongsTo(User);


// app.use((err, request, response, next) => {
//     console.error(err.stack); // stack es un metodo que muestra la pila de llamadas que se han realizado para llegar a este punto del codigo
//     response.status(500).send('Something broke!');
// });

// // Middleware de autenticación global
// app.use((req, res, next) => {
//     if (req.cookies && req.cookies.token) {
//         try {
//             const decoded = jwt.verify(req.cookies.token, '123456');
//             req.user = decoded;
//         } catch (err) {
//             console.error('Error de autenticación:', err);
//         }
//     }
//     next();
// });

// app.get('/', (req, res) => {
//     res.json({ message: 'API funcionando correctamente' });
// });

// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set('bodyParser');
// app.use(cors());

// app.use('/users', require('./controllers/user'));
// // app.use('/auth', require('./controllers/auth'));

// const sequelize = new Sequelize(
//     dbconfig.database,
//     dbconfig.username,
//     dbconfig.password, 
//     {
//         host: dbconfig.host,
//         dialect: dbconfig.dialect

//     }
// );

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Conexión a la base de datos establecida correctamente.');
//     })
//     .catch(err => {
//         console.error('No se pudo conectar a la base de datos:', err);
//     });

// // 5. Manejo de cierre graceful
// process.on('SIGTERM', () => {
//     console.log('SIGTERM recibido. Cerrando servidor...');
//     app.close(() => {
//         sequelize.close();
//     });
// });

// // const User = require('./models/user')(sequelize, DataTypes);

// sequelize.sync().then(() => {
//     console.log('Database & tables created!');
// }).catch((error) => {
//     console.error('Error creating database:', error);
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${host}:${port}`);
// });

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
