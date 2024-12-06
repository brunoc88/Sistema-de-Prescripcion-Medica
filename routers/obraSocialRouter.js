const express = require('express');
const obraSocialController = require('../controllers/obraSocialController');
const { verifyToken, verifyRole } = require('../middlewares/authMiddleware');
const routerObra = express.Router();

//solo el administrador puede hacer ABM de Obras

//index de obra
routerObra.get('/index',verifyToken, verifyRole('admin'),obraSocialController.cargarObras);
//crear obra
routerObra.post('/alta',verifyToken, verifyRole('admin'),obraSocialController.altaObraSocial)
//bajar obra
routerObra.patch('/baja/:id',verifyToken, verifyRole('admin'),obraSocialController.bajarObraSocial)
//reactivar obra social
routerObra.patch('/activar/:id',verifyToken, verifyRole('admin'),obraSocialController.activarObraSocial)
//cargar vista form editar con datos de la obra social
routerObra.get('/editar/:id',verifyToken, verifyRole('admin'),obraSocialController.editarObraSocialGet)
//mandar obra social actualizada
routerObra.patch('/editarEnviar/:id',verifyToken, verifyRole('admin'),obraSocialController.actualizarObraSocial)




module.exports = routerObra;