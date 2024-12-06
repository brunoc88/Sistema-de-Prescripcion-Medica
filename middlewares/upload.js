const multer = require('multer');
const path = require('path');


// Configuración de Multer para el almacenamiento
const storage = multer.diskStorage({
    // Aquí estamos especificando que los archivos se guarden en la carpeta 'uploads/avatars' dentro de 'public'
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads/avatars')); // Ruta donde se guardarán los avatares
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nombre único para evitar conflictos
    },
});
// Creamos un middleware de Multer con configuración
const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limitamos el tamaño de los archivos a 2MB
    // Solo permitimos ciertos tipos de archivos (imágenes en este caso)
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);// Si el archivo es válido, lo dejamos pasar
        }
        cb(new Error('Archivo no soportado. Usa JPEG, JPG o PNG.'));
    },
});

module.exports = upload;
