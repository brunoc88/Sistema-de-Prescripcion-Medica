const express = require('express');
const prestacionesController = require('../controllers/prestacionesController');
const prestacionesRouter = express.Router();

//GET vista Alta Prestacion
prestacionesRouter.get('/crear',prestacionesController.vistaAltaPrestacion);
//POST alta prestacion
prestacionesRouter.post('/alta',prestacionesController.altaPrestacion);

module.exports = prestacionesRouter;