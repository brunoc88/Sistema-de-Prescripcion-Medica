const express = require('express');
const TipoPrestacionesController = require('../controllers/tipoPrestaciones');
const tipoPrestacionesRouter = express.Router();

//GET vista index y alta de Prestacion
tipoPrestacionesRouter.get('/index',TipoPrestacionesController.vistaIndexPrestacion);
//POST alta Prestacion
tipoPrestacionesRouter.post('/alta',TipoPrestacionesController.altaPrestacion);

module.exports = tipoPrestacionesRouter;