const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const upload = require('../middlewares/upload');//para cargar avatar
const usuarioRouter = express.Router();


//GET vista index usuario
usuarioRouter.get('/index',usuarioController.vistaIndexUsuario);
//GET vista crear usuario
usuarioRouter.get('/crear',usuarioController.vistaRegistrarUsuario);
//POST para crear usuario
// En la ruta para crear un usuario
 // 'avatar' es el nombre del campo en el formulario HTML
 // Guardar el usuario con el avatar
usuarioRouter.post('/alta',upload.single('avatar'),usuarioController.altaUsuario);
//GET vista editar usuario
usuarioRouter.get('/editar/:id',usuarioController.vistaEditarUsuario);

//PUT actualiza Usuario
usuarioRouter.put('/actualizar/:id', upload.single('avatar'), usuarioController.editarUsuario);


module.exports = usuarioRouter;