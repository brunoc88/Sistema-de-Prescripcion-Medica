const express = require('express');
const obraSocialController = require('../controllers/obraSocialController');
const routerObra = express.Router();

//index de obra
routerObra.get('/index',obraSocialController.cargarObras);
//crear obra
routerObra.post('/alta',obraSocialController.altaObraSocial)
//bajar obra
routerObra.patch('/baja/:id',obraSocialController.bajarObraSocial)
//reactivar obra social
routerObra.patch('/activar/:id',obraSocialController.activarObraSocial)
//cargar vista form editar con datos de la obra social
routerObra.get('/editar/:id',obraSocialController.editarObraSocialGet)
//mandar obra social actualizada
routerObra.patch('/editarEnviar/:id',obraSocialController.actualizarObraSocial)




module.exports = routerObra;