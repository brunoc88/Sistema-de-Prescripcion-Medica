const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const usuarioRouter = express.Router();


//GET vista index usuario
usuarioRouter.get('/index',usuarioController.vistaIndexUsuario);
//GET vista crear usuario
usuarioRouter.get('/crear',usuarioController.vistaRegistrarUsuario);
//POST para crear usuario
usuarioRouter.post('/alta',usuarioController.altaUsuario);
module.exports = usuarioRouter;