const express = require('express');
const prescripcionController = require('../controllers/prescripcionController');
const routerPrescripcion = express.Router();

// GET vista Receta de Medicamentos
routerPrescripcion.get('/recetaMedicamentos',prescripcionController.vistaRecetaMedicamentos);

// POST alta Prescripcion medicamentos
routerPrescripcion.post('/altaMedicacion',prescripcionController.altaPrescripcionMedicamentos);

// GET vista Prestaciones
routerPrescripcion.get('/recetaPrestaciones',prescripcionController.vistaPrescripcionPrestaciones);

// POST alta Prescripcion Prestacion
routerPrescripcion.post('/altaPrestaciones',prescripcionController.altaPrescripcionPrestaciones);


module.exports = routerPrescripcion;