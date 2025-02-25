// const multer = require('multer');

// const storage = multer.diskStorage({ // esto es para guardar los archivos en la carpeta uploads
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); 
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}-${file.originalname}`)
//     }
// });

// const upload = multer({ storage: storage });

// module.exports = upload;