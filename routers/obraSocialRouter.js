const express = require('express');
const obraSocialController = require('../controllers/obraSocialController');
const routerObra = express.Router();


routerObra.get('/index',obraSocialController.cargarObras);

routerObra.post('/alta',obraSocialController.altaObraSocial)

routerObra.patch('/baja/:id',obraSocialController.bajarObraSocial)

routerObra.patch('/activar/:id',obraSocialController.activarObraSocial)

routerObra.get('/editar/:id',obraSocialController.editarObraSocialGet)

routerObra.patch('/editarEnviar/:id',obraSocialController.editarObraSocialPatch)




module.exports = routerObra;