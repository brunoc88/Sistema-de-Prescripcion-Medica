const express = require('express');
const TipoPrestacionesController = require('../controllers/tipoPrestaciones');
const tipoPrestacionesRouter = express.Router();

//GET vista index y alta de Tipo Prestacion
tipoPrestacionesRouter.get('/index',TipoPrestacionesController.vistaIndexTipoPrestacion);
//POST alta Tipo Prestacion
tipoPrestacionesRouter.post('/alta',TipoPrestacionesController.altaTipoPrestacion);
//GET editar Tipo Prestacion
tipoPrestacionesRouter.get('/editar/:id',TipoPrestacionesController.vistaEditarPrestacion);
//PATCH actualizar Tipo Prestacion
tipoPrestacionesRouter.patch('/actualizar/:id',TipoPrestacionesController.actualizarTipoPrestacion);
//PATCH desactivar Tipo Prestacion
tipoPrestacionesRouter.patch('/bajar/:id',TipoPrestacionesController.bajarTipoPrestacion);
//PATCH activar Tipo Prestacion
tipoPrestacionesRouter.patch('/activar/:id',TipoPrestacionesController.activarTipoPrestacion);


module.exports = tipoPrestacionesRouter;