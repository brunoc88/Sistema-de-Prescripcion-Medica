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

// GET obtener todas las prescripciones realizada en la fecha del turno
routerPrescripcion.get('/verPrescripciones/:id',prescripcionController.verPrescripciones);

// PATCH bajar turno de profesional
routerPrescripcion.patch('/bajarTurno/:id',prescripcionController.bajarTurno);

module.exports = routerPrescripcion;