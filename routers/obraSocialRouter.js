const express = require('express');
const obraSocialController = require('../controllers/obraSocialController');
const routerObra = express.Router();


routerObra.get('/index',obraSocialController.cargarObras);

routerObra.post('/alta',obraSocialController.altaObraSocial)

routerObra.patch('/baja/:id',obraSocialController.bajarObraSocial)

//reactivar obra social
routerObra.patch('/activar/:id',obraSocialController.activarObraSocial)

//cargar vista con datos de la obra social
routerObra.get('/editar/:id',obraSocialController.editarObraSocialGet)

//mandar obra social actualizada
routerObra.patch('/editarEnviar/:id',obraSocialController.editarObraSocialPatch)




module.exports = routerObra;